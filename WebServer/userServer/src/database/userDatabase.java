package database;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import model.User;

public class userDatabase {
    Connection ct = null;
    PreparedStatement pestmt = null;
    public userDatabase(){
        try{
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            ct=DriverManager.getConnection("jdbc:sqlserver://localhost:1433;databaseName=schoolNews", "数据库用户名", "数据库密码");
            if(ct != null){
                System.out.println("数据库连接成功");
            }
            else{
                System.out.println("数据库连接失败");
            }
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    // 确认登录信息
    public User checkUser(String username,String password) throws SQLException{
        try{
            System.out.println("正在确认登录信息");
            // 该处报错原因：nvarchar和ntext的类型不匹配。解决方案参考：https://blog.csdn.net/weixin_34343000/article/details/92824471
            pestmt=ct.prepareStatement("select * from [User] where convert(nvarchar(255),username)=? and convert(nvarchar(255),password)=?");
            pestmt.setString(1, username);
            pestmt.setString(2, password);
            ResultSet rs=pestmt.executeQuery(); // 将数据库响应的查询结果放在rs中
            System.out.println("数据库响应结果为：" + rs.toString());

            User user = new User();

            while(rs.next()){
                user.setUsername(rs.getString(1));//第一个属性
                user.setPassword(rs.getString(2));//第二个属性
                System.out.println("用户信息为：" + user.getUsername() + " " + user.getPassword());
                return user;	///查到就返回对象
            }
            return null;
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }finally{
            ct.close();
            pestmt.close();
        }
    }
}

