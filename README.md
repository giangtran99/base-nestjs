

Deploy NestJs with Scenarios:

* Benmark tool : Autocanon (10 connection in 50 seconds)
* Node 1 : i5-3470 (4 CPUs), 8 GB RAM
* Node 2 : M1 Silicon , 16 GB RAM


Case 1 : Deploy in Node 1 , use PM2
+ Average RPS : 846.62

Case 2 : Deploy in Node 1 , use PM2 run cluster with 4 intances

+ Average RPS : 1638.78

Case 3 : Deploy in Node 1 , use PM2 ,reverse proxy use Nginx


Case 4 : Deploy in Node 1 and Node 2 , reverse proxy use Nginx