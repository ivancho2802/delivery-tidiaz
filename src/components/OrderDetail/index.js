import React, { useState, useEffect } from "react";
import { View, Dimensions, Text } from "react-native";
import OrderMap from "../../components/OrderMap";
import { useQuery, useSubscription } from "@apollo/client";
import { getOrder, getCar } from '../../graphql/queries';
import { onOrderUpdated, onCarUpdated } from '../../graphql/subscriptions';

const OrderDetail = ({orderBefore}) => { 
  const [car, setCar] = useState(null);
  const [order, setOrder] = useState(null);
  const [carid, setCarId] = useState(null);
  console.log("orderBefore.id") 
  console.log(orderBefore.id) 

  // Fetch order on initial render
  const { erroro, loadingo, data } = useQuery(getOrder, {
      variables:{ id: orderBefore.id }
  });
  const { dataCarUpdate, loadinguc } = useSubscription(
    onCarUpdated,
    { variables: { id: orderBefore.car.id } }
  ); 
  const { dataOrderUpdate, loadinguo } = useSubscription(
    onOrderUpdated,
    { variables: { id: orderBefore.id } }
  ); 
  //const [GetCar, { errorC }] = useQuery(getCar);
  //const { errorc, loadingc, dataC } = useQuery(getCar, {
  //  variables: { id: order.car.id }
  //});

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (data) {
          console.log("datadatadata")
          console.log(data)
          if(data.getOrder)
          setOrder(data.getOrder);
          else if(data.data.getOrder)
          setOrder(data.data.getOrder);
        }
        if(order){
          console.log("order")
          console.log(order) 
        }
        if(erroro){
          console.log("erroro")
          console.log(erroro)
        }
        if(loadingo){
          console.log("loadingo")
          console.log(loadingo)
        }
        // const orderData = await API.graphql(
        //  graphqlOperation(getOrder, { id: orderBefore.id })
        //);
        //setOrder(orderData.data.getOrder);
      } catch (e) {
        console.error(e)
      }
    }
    fetchOrder();
  }, [data]) 
  useEffect(()=>{
    const fetchCar = async () => {
      try {
        if (order) {
          //console.log("dataC")
          //console.log(dataC)
          /* var dataC = await GetCar({
            variables: {
              id: order.car.id
            },
          }); */
          if(order.car)
          setCar(order.car);
          /* if(order.GetCar)
          setCar(dataC.GetCar);
          else if(dataC.data.GetCar)
          setCar(dataC.data.GetCar); */
        }
        if(car && car?.id){
          console.log("car")
          console.log(car)
          setCarId(car.id)
        }//const carData = await API.graphql(
        //  graphqlOperation(getCar, { id: order.carId })
        //);
        //console.log(carData);
        //setCar(carData.data.getCar);
      } catch (e) {
        console.error(e)
      }
    }
    if(order){
      console.log("order")
      console.log(order) 
      fetchCar();   
    }
  }, [order])
    // Subscribe to order updates
  useEffect(() => {
    if (dataOrderUpdate) {
        console.log(dataOrderUpdate)
        setOrder(dataOrderUpdate.data.onOrderUpdated);
    }else{
      console.log("dataOrderUpdate")
      console.log(dataOrderUpdate)
    }
    if (loadinguo) {
      console.log("loadinguo")
      console.log(loadinguo)
    }
    // const orderData = 
    // const subscription = API.graphql(
    //  graphqlOperation(onOrderUpdated, { id: orderBefore.id })
    //).subscribe({
    //  next: ({ value }) => setOrder(value.data.onOrderUpdated),
    //  error: error => console.warn(error)
    //})

    //return () => subscription.unsubscribe(); 
  }, [dataOrderUpdate])
  
  // Subscribe to car updates
  useEffect(() => {
    if (dataCarUpdate) {
      /* OnCarUpdated({ id: car.id }).subscribe({
        next: ({ value }) => {console.log(value);setCar(value.data.onCarUpdated)},
        error: error => console.warn(error)
      })
      return () => subscription.unsubscribe(); */
      if (dataCarUpdate) {
        console.log(dataCarUpdate)
        setCar(dataCarUpdate.data.onCarUpdated);
      }
      /* if(errorCU)
      console.log(errorCU) */
      // const subscription = API.graphql(
      //  graphqlOperation(onCarUpdated, { id: order.carId })
      //).subscribe({
      //  next: ({ value }) => setCar(value.data.onCarUpdated),
      //  error: error => console.warn(error)
      //})
      //return () => subscription.unsubscribe();
    }else{
      console.log("dataCarUpdate")
      console.log(dataCarUpdate)
    }
  }, [car, dataCarUpdate])

  return (
  <View>
    <Text>Detalles de pedido</Text>
    <View style={{height: Dimensions.get('window').height - 400}}>
      <OrderMap car={car} />
    </View>
    <View>
      <Text>Order status: {order?.status}</Text>
    </View>
  </View>
  );
};

export default OrderDetail;