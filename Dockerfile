FROM ubuntu:16.04
MAINTAINER csbahushruth <bahushruth.bahushruth@gmail.com>

#dependencies
RUN apt-get update && apt-get install -y sudo && rm -rf /var/lib/apt/lists/*
Run apt-get update -yq && apt-get upgrade -yq
Run apt-get install -yq curl git nano
RUN apt-get update && apt-get install -y git
# RUN apt-get -yqq install python-pip python-dev curl gnupg
RUN apt-get update && \
    apt-get install -y \
                    wget \
                    xz-utils \
                    unzip \ 
                    python-opencv \
                    libopencv-dev \
                    libav-tools \
                    libjpeg-dev \
                    libpng-dev \
                    libtiff-dev \
                    libjasper-dev \
                    libasound2-dev \
                    libjasper-dev \ 
                    libgtk2.0-dev \ 
                    libatlas-base-dev \
                    build-essential \
                    libsqlite3-dev \
                    libreadline-dev \
                    libssl-dev \
                    libvtk6-dev \
                    openssl
                        
WORKDIR /tmp
RUN wget https://www.python.org/ftp/python/3.5.0/Python-3.5.0.tar.xz
RUN tar -xf Python-3.5.0.tar.xz
WORKDIR /tmp/Python-3.5.0
RUN ./configure
RUN make
RUN make install

WORKDIR /
RUN rm -rf /tmp/Python-3.5.0.tar.xz /tmp/Python-3.5.0
RUN pip3 install --upgrade pip
RUN pip3 install ipython
WORKDIR /
# RUN apt-get install python-pip python-dev curl gnupg-*
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
Run sudo apt-get install -y nodejs
# RUN sudo apt install libglib2.0-0
RUN apt-get upgrade -y
RUN apt-get -y install   libgles2-mesa-dev libglib2.0-0 libglib2.0-0-dbg  libglib2.0-dev libglu1-mesa-dev libgnome-keyring-dev libgnome-keyring0  libgtk2.0-0 libgtk2.0-0-dbg
RUN  git clone https://github.com/eyeframe/IBMHackathon.git
# RUN cd ilcetHackathon
# RUN cd ilcetHackathon && pwd
WORKDIR /IBMHackathon
# RUN ls
RUN npm install
RUN ls
RUN pip3 install -r requirements.txt

# RUN sudo pip install -r requirements.txt
# RUN sudo npm install
# RUN ls

EXPOSE 8081

CMD [ "npm", "start" ]
