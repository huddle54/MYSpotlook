import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import Blockuser from "./Blockuser";

const index = ({ user, myBlk, onBlocking }) => {
  return (
    <>
      <Blockuser
        user={user}
        myBlk={myBlk}
        onBlocking={onBlocking}
        // followers={followers}
        // followings={followings}
        // setShow={setShow}
      />
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
