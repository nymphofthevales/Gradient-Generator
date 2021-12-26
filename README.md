# Gradient-Generator
A web application for generating a gradient of values between any two hexadecimal or RGB colour codes. This project required me to tackle some interesting problems 
like parsing hexadecimal numbers, sorting lists of numbers, and injecting values at even intervals into a list in order to modify its length in a consistent way. 
It has its issues, especially with colour values near black or including zeros, but overall is a nice project. Can really generate some pretty gradients. 

The generator works by:
1. harvesting user input from the HTML form,
2. splitting the hexadecimal string given into their red, green, and blue components,
3. parsing those hexadecimal numbers into decimal for ease of math,
4. measuring the numerical difference between the start and end values for each red, blue, and green components,
5. pushing new colour values onto the lists at a certain "resolution", or numerical step, until the final desired value is reached,
6. adjusting each of the colour lists to be the same length as the longest one
  (i.e. if there is a large difference in the given red values, but not in blue, there would be less in-between values for blue, and it needs to have average values injected to bring it up to the same length in order to allow the next step),
7. putting the red, green, and blue components back together into hexadecimal colour strings, and finally,
8. printing the result to the HTML page, displaying the gradient as a stack of 1-pixel height div elements with a background colour for each in-between hex code.

A live version of the app can be used at www.nymphofthevales.com/content/gradient/
