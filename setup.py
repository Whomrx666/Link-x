#!/usr/bin/env python3

import os
import sys
import time
import subprocess as sb

# Cyberpunk Neon Colors (sesuai preferensi Mr.X: dominan ungu, hindari hijau)
NEON_PURPLE = "\033[38;5;93m"
NEON_WHITE = "\033[38;5;15m"
RESET = "\033[0m"

def cPrint(text):
    text = text.replace("cPurple", NEON_PURPLE).replace("cWhite", NEON_WHITE)
    print(text + RESET)

def psb(z, end="\n"):
    z = z.replace("cPurple", NEON_PURPLE).replace("cWhite", NEON_WHITE) + RESET
    for p in z + end:
        sys.stdout.write(p)
        sys.stdout.flush()
        time.sleep(0.01)

def is_termux():
    return "com.termux" in os.environ.get("PREFIX", "")

def install_termux_packages():
    required = ["php", "curl", "wget", "unzip", "openssh", "git"]
    missing = []

    for pkg in required:
        if sb.getoutput(f"command -v {pkg}") == "":
            missing.append(pkg)

    if missing:
        cPrint(f"\n[cPurple!cWhite] Installing missing packages: {', '.join(missing)}")
        os.system("pkg update -y > /dev/null 2>&1")
        for pkg in missing:
            psb(f"    → Installing {pkg}...")
            os.system(f"pkg install {pkg} -y > /dev/null 2>&1")
        cPrint("\n[cPurple✓cWhite] All required packages installed!\n")
    else:
        cPrint("\n[cPurple✓cWhite] All dependencies already installed.\n")

def create_data_dir():
    sdcard = "/sdcard"
    if os.path.exists(sdcard):
        data_dir = os.path.join(sdcard, "HackedData")
        os.makedirs(data_dir, exist_ok=True)
        cPrint(f"[cPurple✓cWhite] Created directory: {data_dir}")
    else:
        cPrint("[cPurple!cWhite] Warning: /sdcard not found. Please run `termux-setup-storage`.")

def create_version_file():
    if not os.path.exists(".version"):
        with open(".version", "w") as f:
            f.write('{"version": "2.0"}')
        cPrint("[cPurple✓cWhite] Initialized .version file for update checks.")

def main():
    logo = f"""
{NEON_PURPLE} ██╗     ██╗███╗   ██╗██╗  ██╗    ██╗  ██╗
{NEON_PURPLE} ██║     ██║████╗  ██║╚██╗██╔╝    ╚██╗██╔╝
{NEON_PURPLE} ██║     ██║██╔██╗ ██║ ╚███╔╝      ╚███╔╝ 
{NEON_PURPLE} ██║     ██║██║╚██╗██║ ██╔██╗      ██╔██╗ 
{NEON_PURPLE} ███████╗██║██║ ╚████║██╔╝ ██╗    ██╔╝ ██╗
{NEON_PURPLE} ╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝    ╚═╝  ╚═╝{RESET}
"""
    print(logo)
    cPrint("     [cPurpleLink-X Setup - Termux EditioncWhite]\n")

    if not is_termux():
        cPrint("[cPurple!cWhite] Warning: This setup is optimized for Termux.\n")
        sys.exit(1)

    # Setup storage if needed
    if not os.path.exists("/sdcard"):
        cPrint("[cPurple!cWhite] /sdcard not found!")
        psb("cWhite→ Please run: cPurpletermux-setup-storage")
        sys.exit(1)

    install_termux_packages()
    create_data_dir()
    create_version_file()

    cPrint("\n[cPurple✓cWhite] Setup completed successfully!")
    psb("cWhite→ Run: cPurplepython Link-x.pycWhite to start the tool.\n")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        cPrint("\n\n[cPurple!cWhite] Setup interrupted by user.")
        sys.exit(1)