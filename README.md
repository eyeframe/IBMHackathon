# PROJECT OVERVIEW :
![capture](https://user-images.githubusercontent.com/37112252/46212400-8112e080-c353-11e8-9e5b-1a63c131a34a.PNG)

# FUNCTIONING OF THE WEBSITE:

OVERALL VIEW OF OUR UI AND WEBSITE

showcasing usability and services provided on the site

![g2](https://user-images.githubusercontent.com/43675125/46228485-d8c74100-c37f-11e8-8b0f-5e49cfee6294.gif)
![g3](https://user-images.githubusercontent.com/43675125/46228686-7884cf00-c380-11e8-8c29-9265cea11211.gif)
![g6](https://user-images.githubusercontent.com/43675125/46229026-c1895300-c381-11e8-90ac-0806a8233bc5.gif)
# PREDICTING BUILDING DAMAGE :

https://github.com/eyeframe/IBMHackathon/blob/master/jupyter_notebooks/Earthquake_building_damage_prediction.ipynb

In this jupyter notebook we try to predict the damage of buildings in case of an earthquake based on features 
such as Superstructure type, Age, Area etc 

![capture4](https://user-images.githubusercontent.com/37112252/46212956-ed421400-c354-11e8-879b-996803914ff0.PNG)

marking the buildings in an area based on the damage it may suffer in case of an earthquake 

![g5](https://user-images.githubusercontent.com/43675125/46228989-9bfc4980-c381-11e8-82d4-bd0b15f6fd8c.gif)
# FLOOD ANOMALY DETECTION :
https://github.com/eyeframe/IBMHackathon/blob/master/jupyter_notebooks/flood_anomaly_detection.ipynb

We are using a reservoir water levels to stimulate a water body where flooding is possible
We are plotting the anomalies on elevation vs index graph (red dots represent anomaly)

![capture2](https://user-images.githubusercontent.com/37112252/46212409-8839ee80-c353-11e8-9a10-7353061730aa.PNG)

sending notifications once the anomalies are detected so that proper actions could be taken

![g4](https://user-images.githubusercontent.com/43675125/46228744-b681f300-c380-11e8-993f-a60aeba5b676.gif)
# POPUALTION INFLUX AND OUTFLUX ANOMALY :
https://github.com/eyeframe/IBMHackathon/blob/master/jupyter_notebooks/food_resource_management.ipynb
Plotting anomaly of incoming and outgoing people per day .
Using this we calculate the food stocks needed in order to fullfil the needs for the population residing in the 
affected area

incoming population and anomalies(red dots represent anomaly)

![cp1](https://user-images.githubusercontent.com/43675125/46225003-9d277980-c375-11e8-9ce9-54632807c22b.PNG)

outgoing population and anomalies(red dots represent anomaly)

![cp2](https://user-images.githubusercontent.com/43675125/46225046-b4666700-c375-11e8-9446-92686aa15755.PNG)
# FOOD RESOURCE MANAGEMENT :
https://github.com/eyeframe/IBMHackathon/blob/master/jupyter_notebooks/food_resource_management.ipynb
informing about the current stocks remaining , how many days it will last and if the condition is critical or not
based on the no of days left for disaster

![g1](https://user-images.githubusercontent.com/43675125/46228358-78d09a80-c37f-11e8-93fe-1a5c91bf6580.gif)
# INFORMING PEOPLE THROUGH MESSAGES AND EMAIL :

<img src="https://user-images.githubusercontent.com/43675125/46229723-2fcf1500-c384-11e8-846f-ee24c57e6146.jpg" width="400" height="800" />
<img src="https://user-images.githubusercontent.com/43675125/46229726-32316f00-c384-11e8-87a2-1abf927df1d5.jpg" width="400" height="800" />

# INSTALL DOCKER :
●	Install a maintained version of Docker Community Edition (CE) or Enterprise Edition (EE) on a supported platform.

https://www.docker.com/products/docker-engine

![alt text](https://s3-torquehhvm-wpengine.netdna-ssl.com/uploads/2016/08/docker-version.png)

●	Run the following lines on a command prompt : 

1.	sudo docker pull eyeframe/callforcode
2.	sudo docker run -p 8081:8081 -it --device /dev/snd  eyeframe/callforcode

if the docker pull dosen't work , follow these steps 
1. sudo docker build -t eyeframe/callforcode
2. sudo docker run -p 8081:8081 -it --device /dev/snd  eyeframe/callforcode

# HOW TO RUN THE SERVER DIRECTLY :

1. clone the repository using

   git clone https://github.com/eyeframe/IBMHackathon.git
   
2. download the files

3. follow the instructions given below

   1>pip install requirements.txt

   2>npm install

   3>npm start
