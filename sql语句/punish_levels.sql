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

 Date: 19/12/2020 21:17:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for punish_levels
-- ----------------------------
DROP TABLE IF EXISTS `punish_levels`;
CREATE TABLE `punish_levels`  (
  `CODE` int(11) NOT NULL,
  `DESCRIPTION` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`CODE`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of punish_levels
-- ----------------------------
INSERT INTO `punish_levels` VALUES (0, '警告');
INSERT INTO `punish_levels` VALUES (1, '严重警告');
INSERT INTO `punish_levels` VALUES (2, '记过');
INSERT INTO `punish_levels` VALUES (3, '记大过');
INSERT INTO `punish_levels` VALUES (4, '开除');

SET FOREIGN_KEY_CHECKS = 1;
