package model;

/**
 *  Name:       Information.java
 *  Author:     LIN Guocheng
 *  Date:       2021-3-28
 *  Function:   用于存取校内通知的标题、发布时间和文章主体。
 */
public class Information {

    private String title;
    private String date;
    private String article;
    private String[] image;

    public Information(String title, String date, String article, String[] image) {
        this.title = title;
        this.date = date;
        this.article = article;
        this.image = image;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getArticle() {
        return article;
    }

    public void setArticle(String article) {
        this.article = article;
    }

    public void setImage(String[] image) {
        this.image = image;
    }

    public String[] getImage() {
        return image;
    }
}
