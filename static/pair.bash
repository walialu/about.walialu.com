#!/bin/bash

accountname="pair"
publickeyurl="https://gorilla.moe/ssh.pub"

user_exists() {
        if id "$1" >/dev/null 2>&1; then
                echo 1
        else
                echo 0
        fi
}

create_user() {
        sudo useradd -m -d /home/"$1" -s /bin/bash "$1"
        sudo usermod --lock "$1"
}

add_key_to_user() {
        sudo mkdir -p /home/"$2"/.ssh
        wget "$1" -O /tmp/ssh.pub
        cat /tmp/ssh.pub | sudo tee -a /home/"$2"/.ssh/authorized_keys > /dev/null
        sudo chown -R "$2" /home/"$2"/.ssh
        sudo chmod 700 /home/"$2"/.ssh
        sudo chmod 600 /home/"$2"/.ssh/authorized_keys
}

main() {
        if [[ $(user_exists "$accountname") == 1 ]]; then
                echo "user already exists"
                add_key_to_user "$publickeyurl" "$accountname"
                exit 1
        fi
        create_user "$accountname"
        add_key_to_user "$publickeyurl" "$accountname"
}

boot() {
        if [[ $(id -u) -eq 0 ]]; then alias sudo=''; fi
        echo -ne "\n\tThis will create a user '$accountname' (if it does not exist, yet)\n"
        echo -ne "\tand add this the public key from\n"
        echo -ne "\t'$publickeyurl'\n"
        echo -ne "\tto '/home/$accountname/.ssh/authorized_keys'.\n\n"
        echo -ne "\tDo you want to continue? (y/n)? "
        read -r -n 1 input
        if [[ "$input" == "y" ]]; then
                echo
                main
        else
                echo
        fi
}

boot 

