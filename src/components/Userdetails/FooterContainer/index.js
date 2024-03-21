import { StyleSheet, View } from "react-native";
import React from "react";
import FollowersSheet from "../../Bottomsheets/FollowersSheet";
import FollowingSheet from "../../Bottomsheets/FollowersSheet";
import FollowerBox from "./FollowerBox";
import FollowingBox from "./FollowingBox";

const FooterContainer = ({
  show,
  setShow,
  show1,
  setShow1,
  followers,
  followings,
  isMe,
  myBlk,
}) => {
  return (
    <>
      <FollowersSheet
        show={show}
        onDismiss={() => {
          setShow(false);
        }}
        enableBackdropDismiss
        visible={setShow}
      >
        {/* FollowerBox */}
        <FollowerBox
          followings={followings}
          isMe={isMe}
          myBlk={myBlk}
          setShow={setShow}
        />
      </FollowersSheet>
      <FollowingSheet
        show={show1}
        onDismiss={() => {
          setShow1(false);
        }}
        enableBackdropDismiss
        visible={setShow1}
      >
        {/* FollowingBox */}
        <FollowingBox followers={followers} myBlk={myBlk} setShow1={setShow1} />
      </FollowingSheet>
    </>
  );
};

export default FooterContainer;

const styles = StyleSheet.create({});
