<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<html>
<body>
<h2>Hello World!你好世界！</h2>


<%!
    private int initVar=0;
    private int serviceVar=0;
    private int destroyVar=0;
%>

<%!
    public void jspInit(){
        initVar++;
        System.out.println("jspInit(): JSP被初始化了"+initVar+"次");
    }
    public void jspDestroy(){
        destroyVar++;
        System.out.println("jspDestroy(): JSP被销毁了"+destroyVar+"次");
    }
%>

<%
    serviceVar++;
    System.out.println("_jspService(): JSP共响应了11"+serviceVar+"次请求");
    String content1="初始化次数 : "+initVar;
    String content2="响应客户请求次数 : "+serviceVar;
    String content3="销毁次数 : "+destroyVar;
    String content4="destroyVar 111====== "+destroyVar;
    Integer content5= 5/2;
    <%--    String content4="destroyVar 111====== "+destroyVar;  --%>

%>

<h1>菜鸟教程 JSP 测试实例</h1>
<p><%= content1 %></p>
<p><%= content2 %></p>
<p><%= content3 %></p>
<p><%= content4 %></p>
<p><%= content5 %></p>
<p><%= content4 %></p>
<p><%= 6/2 %></p>

<% out.println("Your IP address is " + request.getRemoteAddr()); %>
<% out.println("config is " + (config) ); %>

<jsp:include page="date.jsp"  flush="true" />


</body>
</html>
