/*
 Navicat Premium Data Transfer

 Source Server         : mysql_v8
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : keshe

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 19/12/2020 21:17:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for reward_levels
-- ----------------------------
DROP TABLE IF EXISTS `reward_levels`;
CREATE TABLE `reward_levels`  (
  `CODE` int(11) NOT NULL,
  `DESCRIPTION` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`CODE`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of reward_levels
-- ----------------------------
INSERT INTO `reward_levels` VALUES (0, '校特等奖学金');
INSERT INTO `reward_levels` VALUES (1, '校一等奖学金');
INSERT INTO `reward_levels` VALUES (2, '校二等奖学金');
INSERT INTO `reward_levels` VALUES (3, '校三等奖学金');
INSERT INTO `reward_levels` VALUES (4, '系一等奖学金');
INSERT INTO `reward_levels` VALUES (5, '系二等奖学金');
INSERT INTO `reward_levels` VALUES (6, '系三等奖学金');

SET FOREIGN_KEY_CHECKS = 1;
