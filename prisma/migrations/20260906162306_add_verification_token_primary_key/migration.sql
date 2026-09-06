-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `authenticator` DROP FOREIGN KEY `Authenticator_userId_fkey`;

-- DropForeignKey
ALTER TABLE `incident` DROP FOREIGN KEY `Incident_assignedToUserId_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropIndex
DROP INDEX `VerificationToken_identifier_token_key` ON `verificationtoken`;

-- AlterTable
ALTER TABLE `verificationtoken` ADD PRIMARY KEY (`identifier`, `token`);
