import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import UserOrderCard from "../components/UserOrderCard";
import OwnerOrderCard from "../components/OwnerOrderCard";
import { setMyOrders, updateRealtimeOrderStatus } from "../redux/userSlice";
import { IoArrowBack } from "react-icons/io5";
import Nav from "../components/Nav";

function MyOrders() {
  const { userData, myOrders, socket } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    socket?.on("newOrder", (data) => {
      if (data.shopOrders?.owner._id == userData._id) {
        dispatch(setMyOrders([data, ...myOrders]));
      }
    });

    socket?.on(
      "update-status",
      ({ orderId, shopId, status, userId, assignedDeliveryBoy }) => {
        if (userId == userData._id) {
          dispatch(
            updateRealtimeOrderStatus({
              orderId,
              shopId,
              status,
              assignedDeliveryBoy,
            })
          );
        }
      }
    );

    return () => {
      socket?.off("newOrder");
      socket?.off("update-status");
    };
  }, [socket, dispatch, myOrders, userData._id]);

  return (
    <>
      <Nav />
      <div
        className='"w-full min-h-screen flex justify-center px-4 pt-[100px]'
        style={{ backgroundColor: "#EEE8B2" }}
      >
        <div className="w-full max-w-[800px] p-4">
          <div className="flex items-center gap-[20px] mb-6 ">
            <div className=" z-[10] " onClick={() => navigate("/")}>
              <IoArrowBack size={35} style={{ color: "#5A8F76" }} />
            </div>
            <h1
              className="text-2xl font-bold text-start"
              style={{ color: "#203B37" }}
            >
              My Orders
            </h1>
          </div>
          <div className="space-y-6">
            {myOrders?.map((order, index) =>
              userData.role == "user" ? (
                <UserOrderCard data={order} key={index} />
              ) : userData.role == "owner" ? (
                <OwnerOrderCard data={order} key={index} />
              ) : null
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyOrders;
