import { StyleSheet } from "react-native";
import React, { useState } from "react";
import MainContainer from "./MainContainer";
import FooterContainer from "./FooterContainer";

const Userdetails = ({ posts, followers, followings, isMe, myBlk }) => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  return (
    <>
      <MainContainer
        posts={posts}
        followings={followings}
        followers={followers}
        setShow={setShow}
        setShow1={setShow1}
        myBlk={myBlk}
      />
      <FooterContainer
        isMe={isMe}
        followings={followings}
        followers={followers}
        setShow={setShow}
        setShow1={setShow1}
        show={show}
        show1={show1}
        myBlk={myBlk}
      />
    </>
  );
};

export default Userdetails;

const styles = StyleSheet.create({});
