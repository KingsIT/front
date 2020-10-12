colors


安装系统工具
yum install -y yum-utils device-mapper-persistent-data lvm2
安装 docker 软件源
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
更新缓存

drone 自动化构建时需要将 github 的 回传地址 Payload URL 需要带上 drone 服务的 端口号
