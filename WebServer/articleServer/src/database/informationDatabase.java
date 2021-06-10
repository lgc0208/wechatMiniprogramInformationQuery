package database;

import model.Information;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import com.alibaba.fastjson.*;



public class informationDatabase {
    String lableName = "";
    Connection ct = null;
    PreparedStatement pestmt = null;
    String jsonOutput = "";
    private List<Information> information = new ArrayList<Information>();
    public informationDatabase(String lableName) {
        try {
            this.lableName = lableName;
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            ct = DriverManager.getConnection("jdbc:sqlserver://localhost:1433;databaseName=schoolNews", "这里输入数据库用户名", "这里输入数据库密码");
            if (ct != null) {
                System.out.println("数据库连接成功");
            } else {
                System.out.println("数据库连接失败");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 获取通知信息并存储到Notification数组中
    public String getInformation() throws SQLException {
        try {
            System.out.println("正在打包发送 校内通知");

            pestmt = ct.prepareStatement("select * from " + this.lableName + " order by date desc");
            ResultSet rs = pestmt.executeQuery(); // 将数据库响应的查询结果放在rs中

            while(rs.next()) {

            	//System.out.println(rs.getString(1)+",");	//标题
            	//System.out.println(rs.getString(2)+",");
            	//System.out.println(rs.getString(3)+",");
                String[] imgUrls = rs.getString(4).split(","); // 将image字符串按逗号分割，成为数组
                Information information = new Information(rs.getString(1),rs.getString(2),rs.getString(3),imgUrls);
                this.information.add(information);
            }
            jsonOutput = JSON.toJSONString(information);
            System.out.println(jsonOutput);
            return jsonOutput;
        } catch (Exception e) {
            e.printStackTrace();
            return "转换JSON出错";
        } finally {
            ct.close();
            pestmt.close();
        }

    }


}


