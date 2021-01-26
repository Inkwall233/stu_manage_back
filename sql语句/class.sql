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

 Date: 19/12/2020 21:17:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `ID` int(11) NOT NULL,
  `NAME` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `MONITOR` int(11) NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE,
  INDEX `MONITOR`(`MONITOR`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES (0, '计算机科学与技术', 0);
INSERT INTO `class` VALUES (1, '网络工程', 0);
INSERT INTO `class` VALUES (2, '信息安全', 0);
INSERT INTO `class` VALUES (3, '音乐与舞蹈学', 0);
INSERT INTO `class` VALUES (4, '美术学', 0);
INSERT INTO `class` VALUES (5, '设计学', 0);
INSERT INTO `class` VALUES (6, '汉语国际教育', 0);
INSERT INTO `class` VALUES (7, '日语', 0);
INSERT INTO `class` VALUES (8, '翻译', 0);
INSERT INTO `class` VALUES (9, '电气工程及其自动化', 0);
INSERT INTO `class` VALUES (10, '电子信息工程', 0);
INSERT INTO `class` VALUES (11, '通信工程', 0);
INSERT INTO `class` VALUES (12, '应用化学', 0);
INSERT INTO `class` VALUES (13, '化学工程与工艺', 0);
INSERT INTO `class` VALUES (14, '环境工程', 0);

SET FOREIGN_KEY_CHECKS = 1;
