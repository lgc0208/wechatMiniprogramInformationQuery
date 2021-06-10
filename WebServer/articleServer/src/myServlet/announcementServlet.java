package myServlet;

import java.io.IOException;
import java.io.Writer;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import database.informationDatabase;



public class announcementServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=utf-8");
        //设置响应头允许ajax跨域访问
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET,POST");

        Writer out = response.getWriter();
        String jsonOutput = "";
        informationDatabase nd = new informationDatabase("schoolAnnouncements");
        try {
            jsonOutput = nd.getInformation();
            out.write(jsonOutput);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }


        out.flush();
    }
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request,response);

    }

}
