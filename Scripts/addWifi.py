#This script requires python3 and sudo
#Usage example: sudo python3 addWifi.py

print("Plug in the Raspberry Pi's microSD card. \n")
path = input("Enter path to \"rootfs\" (ie. /media/andrew/ ): ")
wifi = input("Enter WiFi name: ")
password = input("Enter WiFi password: ")

wifiConfig = open(path + "rootfs/etc/wpa_supplicant/wpa_supplicant.conf", "a+")

content = "\n\nnetwork={\n\tscan_ssid=1\n\tssid=\"" + wifi + "\"\n\tpsk=\"" + password + "\"\n}"

wifiConfig.write(content)
wifiConfig.close()