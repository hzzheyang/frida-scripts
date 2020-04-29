from unicorn import *
from unicorn.x86_const import *

import struct


def read(name):
    with open(name,"rb") as f:
        return f.read()


def u32(data):
    return struct.unpack("I", data)[0]


def p32(num):
    return struct.pack("I", num)


mu = Uc(UC_ARCH_X86, UC_MODE_64)

BASE = 0x400000
STACK_ADDR = 0x0
STACK_SIZE = 1024 * 1024

mu.mem_map(BASE, 1024 * 1024)
mu.mem_map(STACK_ADDR, STACK_SIZE)

mu.mem_write(BASE, read("./fibonacci"))
mu.reg_write(UC_X86_REG_RSP, STACK_ADDR + STACK_SIZE - 1)

instructions_skip_list = [0x00000000004004EF, 0x00000000004004F6, 0x0000000000400502, 0x000000000040054F]

FIBONACCI_ENTRY = 0x0000000000400670
FIBONACCI_END = [0x00000000004006F1, 0x0000000000400709]

stack = []  # Stack for storing the arguments
d = {}  # Dictionary that holds return values for given function arguments


def hook_code(mu, address, size, user_data):
    # print('>>> Tracing instruction at 0x%x, instruction size = 0x%x' %(address, size))

    if address in instructions_skip_list:
        mu.reg_write(UC_X86_REG_RIP, address + size)

    elif address == 0x400560:  # That instruction writes a byte of the flag
        c = mu.reg_read(UC_X86_REG_RDI)
        print(chr(c))
        mu.reg_write(UC_X86_REG_RIP, address + size)

    elif address == FIBONACCI_ENTRY:  # Are we at the beginning of fibonacci function?
        arg0 = mu.reg_read(UC_X86_REG_RDI)  # Read the first argument. Tt is passed via RDI
        r_rsi = mu.reg_read(UC_X86_REG_RSI)  # Read the second argument which is a reference
        arg1 = u32(mu.mem_read(r_rsi, 4))  # Read the second argument from reference

        if (arg0, arg1) in d:  # Check whether return values for this function are already saved.
            (ret_rax, ret_ref) = d[(arg0, arg1)]
            mu.reg_write(UC_X86_REG_RAX, ret_rax)  # Set return value in RAX register
            mu.mem_write(r_rsi, p32(ret_ref))  # Set retun value through reference
            mu.reg_write(UC_X86_REG_RIP,
                         0x400582)  # Set RIP to point at RET instruction. We want to return from fibonacci function

        else:
            stack.append((arg0, arg1, r_rsi))  # If return values are not saved for these arguments, add them to stack.

    elif address in FIBONACCI_END:
        (arg0, arg1, r_rsi) = stack.pop()  # We know arguments when exiting the function

        ret_rax = mu.reg_read(UC_X86_REG_RAX)  # Read the return value that is stored in RAX
        ret_ref = u32(mu.mem_read(r_rsi, 4))  # Read the return value that is passed reference
        d[(arg0, arg1)] = (ret_rax, ret_ref)  # Remember the return values for this argument pair


mu.hook_add(UC_HOOK_CODE, hook_code)

mu.emu_start(0x00000000004004E0, 0x0000000000400575)
