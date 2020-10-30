# V1.0版

在此版本中
- 连接了数据库, 所有连接程序写在了mysql文件夹里
- 接收onenet的HTTP推送
- 现在收到onenet的POST请求后会转存到mysql数据库的device_rec表里
- 访问 /rec 可以获取MySQL的device_rec里的数据
- 解决了node访问MySQL时区不统一的内容
