# Buoy-Data-App
![alt text](https://c2.staticflickr.com/2/1980/45164389582_eba5ca9bd5_c.jpg)

# Why Search for Buoy Data?
Because I believe in the almighty ocean. She is a scary, powerful mother, but nonetheless she provides earth with life and good times. Getting feedback from her is critical and that's exactly what this app acheives. So if you believe in fishing, surfing, sailing, boating, or you're just a straight up storm chaser, boy do I have the app for you. This baby will return the last known reading from either the closest buoy to your location (Click 'Nearest Buoy') or you can search the globe (Search 'Further Buoy' and enter a city) and it will return the closest buoy reading from that location plus some fancy charts and a map of that location. 

# How to Utilize this Data? 
All the data returned can be used to establish trends and get live oceanic conditions from around the globe. If you fish, you might want to know if fishing in the surf is currently favorable or you might want to know what the current water temperature is closest to you. If you surf, you might want to know what the last 12 hours swell period is, to see if it's getting longer or shorter. Ocean data can be used for a wide variety of purposes for any ocean activity and this app pulls the data you want in a cleaner, quicker manner. 

<b>[Here's a great video that explains how to put together all this data to get the most out of this app](https://youtu.be/Yl14Dggru0o)</b>

# What Technologies were used to build this App? 
[HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)</br>
[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)</br>
[Javascript](https://www.javascript.com/)</br>
[jQuery](https://jquery.com/)</br>
[Asynchronous HTTP (Ajax) Request](http://api.jquery.com/jquery.ajax/)</br> 

were used to build this site and make it operational. The cool technologies used to actually make this useful were Stormglass' API, which collects hourly readings from buoy's all over the world from a number of different websites. Google maps API was used to return a map of the users selected location, which then allows interaction from the user. Google's geolocation and reverse geocode enables the program to return coordinates from the users current location or searched location. This passes the coordinates to another function to return the closest address to that location, to then pass to Google Maps to update the current pindrop. 
