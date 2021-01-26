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

 Date: 19/12/2020 21:17:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department`  (
  `ID` int(11) NOT NULL,
  `NAME` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES (0, '计算机科学与工程学院');
INSERT INTO `department` VALUES (1, '艺术学院');
INSERT INTO `department` VALUES (2, '外国语学院');
INSERT INTO `department` VALUES (3, '信息与电气工程学院');
INSERT INTO `department` VALUES (4, '化学化工学院');

SET FOREIGN_KEY_CHECKS = 1;
