#KKAwsome

# 守護台灣比賽

####Demo WebSite: 
http://rescuetw.azurewebsites.net/

####GitHub: 

WebSite: https://github.com/kyleap/rescue.Web

Mobile: https://github.com/alexktchen/rescue.iOS

API: https://github.com/kinwind/rescue.API

## Synopsis
This project provide api service for mobile and web.

## API Reference

* URL: http://rescueapiservice.azurewebsites.net/api/rescueInfo

  Method: GET
  
  Return:
	{
	
        "id": 主鍵,
        "xAddr": 座標(E),
        "yAddr": 座標(N),
        "rescueTime": 求救時間,
        "photoUrl": 圖片連結,
        "videoUrl": 影片連結,
        "audioUrl": 聲音檔連結,
        "senderName": 送出資料者名稱(APP),
        "senderId": 送出資料者主鍵(APP)
        
    }
    
  說明：取得求救點資料

* URL: http://rescueapiservice.azurewebsites.net/api/rescueInfo

  Method: POST

  Content-Type: application/x-www-form-urlencoded

  Data: {
        
        "id": 主鍵,
        "xAddr": 座標(E),
        "yAddr": 座標(N),
        "rescueTime": 求救時間,
        "photoUrl": 圖片連結,
        "videoUrl": 影片連結,
        "audioUrl": 聲音檔連結,
        "senderName": 送出資料者名稱(APP),
        "senderId": 送出資料者主鍵(APP)
        
	  }
	  
  說明：新增求救點資料

* URL: http://rescueapiservice.azurewebsites.net/api/helpInfo

  Method: GET

  Return:
	{
	
        "id": 主鍵,
        "name":  名稱,
        "xAddr": 座標(E),
        "yAddr": 座標(N),
        "tel": 電話,
        "website": 網站URL
        
    }
    
  說明：取得救援資料
		
* URL: http://rescueapiservice.azurewebsites.net/api/helpInfo

  Method: POST

  Content-Type: application/x-www-form-urlencoded

  Data: {

        "gid": 主鍵,
        "name":  名稱 ,
        "xAddr": 座標(E),
        "yAddr": 座標(N),
        "tel": 電話,
        "website": 網站URL
        
	  }
 	  
  說明：新增救援資料

