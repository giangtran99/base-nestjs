

Deploy NestJs with Scenarios:

* Benmark tool : Autocanon (10 connection in 50 seconds)
* Node 1 : i5-3470 (4 CPUs), 8 GB RAM , Window 10
* Node 2 : M1 Silicon , 16 GB RAM MacOS

--------------

Deploy in Node 1 

Case 1 : use PM2
+ Average RPS : 846.62

Case 2 : use PM2 run cluster with 4 intances
+ Average RPS : 1638.78

Case 3 : use PM2 ,reverse proxy use Nginx
+ Average RPS : 77.3

--------------
Deploy in Node 2 
Case 1 : use PM2 
+ Average RPS : 2250.74

Case 2 : use PM2 run cluster with 4 intances 
+ Average RPS : ...

Case 3 : use PM2 ,reverse proxy use Nginx
+ Average RPS : 4384.24

----------------

Deploy in Node 1 and Node 2 , Mysql run in Node 2 , Nginx
+ Average RPS :

