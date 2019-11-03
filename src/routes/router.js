const express = require('express');
const router = express.Router();

const pooldb = require('../database');

router.get('/getcustomers', async (req, res) => {
    const customers = await pooldb.query('SELECT * FROM customer');
    res.json(customers);
});
router.get('/getitems', async (req, res) => {
    const items = await pooldb.query('SELECT * FROM item');
    res.json(items);
});

router.post('/order', (req, res) => {
    console.log(req.body);
    const { OrderID, OrderNo, CustomerID, PMethod, GTotal, OrderItems } = req.body;
    var idOrder = 0;
    var idOrderUpdated = 0;
     if(OrderID === null){
          const savedOrder = pooldb.query("INSERT INTO `order` (`OrderNo`,`CustomerID`,`PMethod`, `GTotal`) VALUES ('" + OrderNo + "', '" + CustomerID + "','" + PMethod + "','" + GTotal + "')", 
            function(error, result){
                idOrder = result.insertId;
                console.log(idOrder);

                for(let i = 0; i < OrderItems.length; i++) {
                    console.log(OrderItems[i].ItemID);
                     pooldb.query("INSERT INTO `orderitems` (`OrderID`,`ItemID`,`Quantity`) VALUES ('" + idOrder + "', '" + OrderItems[i].ItemID + "','" + OrderItems[i].Quantity + "')"); 
                }     
           });
          
     }else{
         const updateOrder = pooldb.query('UPDATE `order` SET OrderNo = ?, CustomerID = ?, PMethod = ?, GTotal = ?  WHERE OrderID = ?', [OrderNo, CustomerID, PMethod, GTotal, OrderID],
            function(error, result){
                        for (let i = 0; i < OrderItems.length; i++) {
                            pooldb.query('UPDATE `orderitems` SET  ItemID = ?, Quantity = ? WHERE OrderID = ?', [OrderItems[i].ItemID, OrderItems[i].Quantity, OrderID]);
                            
                        }
            });
         console.log('Order is not null', OrderID);
     }
     return res.json('succesfully');     
});

router.get('/getOrders', async (req, res) => {
    const orders = await pooldb.query('SELECT * FROM `order` n1 inner join customer t1 on n1.CustomerID = t1.CustomerID');
    res.json(orders);
});

router.get('/getOrderBy/:id', async (req, res) => {
    const id = req.params.id;
    const order = await pooldb.query('SELECT * FROM `order` WHERE OrderID = ?', id);
    const  orderM = { OrderID, OrderNo, CustomerID, PMethod, GTotal } = order [0];
  
    const orderItems = await pooldb.query('SELECT * FROM `orderitems` o INNER join item s on o.ItemID = s.ItemID WHERE o.OrderID = ?', id);

    object.order = orderM;
    object.orderDetails = orderItems;

    res.json(object);
});
router.delete('/deleteBy/:id', async (req, res) => {
    const id = req.params.id;
    await pooldb.query('DELETE s.* FROM `order` s INNER JOIN orderitems n ON s.OrderID = n.OrderID WHERE n.OrderID = ?', id);

    console.log('deleting...');

    res.json('succesfully deleted..');
});
var object = {
    order:{},
    orderDetails:[]
}

module.exports = router;
