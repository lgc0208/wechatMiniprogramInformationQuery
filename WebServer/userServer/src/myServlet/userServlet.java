package myServlet;

import java.io.IOException;
import java.io.Writer;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.User;
import database.userDatabase;


public class userServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=utf-8");
        //设置响应头允许ajax跨域访问
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET,POST");

        //获取微信小程序get的参数值并打印
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        System.out.println("微信小程序中获得的内容为：username:" + username + " password:" + password);

        userDatabase userDatabase =new userDatabase(); // 建立输入信息比对对象
        HttpSession session=request.getSession(); // 创建保存信息对象
        User user=(User) session.getAttribute("user");

        if(user == null){//第一次进入
            try {
                user= userDatabase.checkUser(username, password);
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }///如果账户密码正确，把返回的对象抛给user，不正确对象则为空
        }

        session.setAttribute("user", user);///保存对象
        Writer out = response.getWriter();
        if(user!=null){///有对象，用户名密码正确
            out.write("success");//向小程序返回结果
        }else{//对象为空
            out.write("error");
        }
        out.flush();
    }
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request,response);

    }

}

