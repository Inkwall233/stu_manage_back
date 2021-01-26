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

 Date: 19/12/2020 21:18:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for change_code
-- ----------------------------
DROP TABLE IF EXISTS `change_code`;
CREATE TABLE `change_code`  (
  `CODE` int(11) NOT NULL,
  `DESCRIPTION` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`CODE`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of change_code
-- ----------------------------
INSERT INTO `change_code` VALUES (0, '转系');
INSERT INTO `change_code` VALUES (1, '休学');
INSERT INTO `change_code` VALUES (2, '复学');
INSERT INTO `change_code` VALUES (3, '退学');
INSERT INTO `change_code` VALUES (4, '毕业');

SET FOREIGN_KEY_CHECKS = 1;
