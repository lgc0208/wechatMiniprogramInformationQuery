"""
Finally edited on Sun Apr  4 22:35:22 2021

@name:      main.py
@author:    LIN Guocheng
@email:     lgc0208@bupt.edu.cn

Description: 
"""
import portalToSQL as pts

loginUrl = 'https://auth.bupt.edu.cn/authserver/login?service=http%3A%2F%2Fmy.bupt.edu.cn%2Findex.portal' # 登录页面的URL
# 由于北邮信息门户的特殊性，此处使用的是人工登录门户后获得的cookie
cookie = {'cookie':'JSESSIONID='} 
notificationUrl = 'http://my.bupt.edu.cn/list.jsp?urltype=tree.TreeTempUrl&wbtreeid=1154' # 校内通知的URL
notificationHref = 'xntz_content.jsp' # 校内通知的 href 标识
announcementUrl = 'http://my.bupt.edu.cn/list.jsp?urltype=tree.TreeTempUrl&wbtreeid=1305' # 公示公告的URL
announcementHref = 'content.jsp'
newsUrl = 'http://my.bupt.edu.cn/list.jsp?urltype=tree.TreeTempUrl&wbtreeid=1221' # 校内新闻的URL
newsHref = 'xnxw_content.jsp'
lectureUrl = 'http://my.bupt.edu.cn/jz_list.jsp?urltype=tree.TreeTempUrl&wbtreeid=1300' # 学术讲座的URL
lectureHref = 'hy_content.jsp'

    

if __name__ == '__main__':
    
    notification = pts.portalToSQL(loginUrl, cookie, notificationUrl, notificationHref, 'schoolArticles')
    notification.getInformation()
    
    announcement = pts.portalToSQL(loginUrl, cookie, announcementUrl, announcementHref, 'schoolAnnouncements')
    announcement.getInformation()
    
    
    news = pts.portalToSQL(loginUrl, cookie, newsUrl, newsHref, 'schoolNews')
    news.getInformation()
    

    lecture = pts.portalToSQL(loginUrl, cookie, lectureUrl, lectureHref, 'schoolLectures')
    lecture.getInformation()

    