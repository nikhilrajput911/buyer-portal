<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
    <head>
        <style>
            .center {
                display: block;
                margin-left: auto;
                margin-right: auto;
                width: 20%;
            }
            body {
                color: #721c24;
                background-color: pink;
                font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
            }
        </style>
    </head>
    <body>
        <h4>Error Message: ${exception.message}</h4>
        <h4>URL: ${url}</h4>

<!-- <h4>Exception: ${exception}</h4> -->        
        <!-- <c:forEach items="${exception.stackTrace}" var="ste">
            ${ste}
        </c:forEach> -->

        <h1 style="text-align: center;vertical-align: middle;">Something went wrong!</h1>
        <img class="center" src="assets/images/Error-Icon.jpg" style="border: 2px solid #721c24">
    </body>
</html>