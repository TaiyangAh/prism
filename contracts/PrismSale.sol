// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PrismSale {
    uint256 public totalSales;
    uint256 public maxSales;

    address public owner;
    address public charity;

    mapping(address => bool) sales;

    constructor() {
        totalSales = 0;
        maxSales = 100;

        owner = 0x27F1946898B1b4aD4b42e05EC8e02Ac9E9f67248;
        charity = 0x4D13fAe8098f2f40C5840e3ccDd5B1ba64c09c55;
    }

    function canBuy() public view returns (bool) {
        return totalSales < maxSales;
    }

    function hasAccess() public view returns (bool) {
        return sales[msg.sender];
    }

    function buy() public payable returns (bool) {
        require(canBuy() == true, "can't buy this");
        require(msg.value == 0.01 ether, "incorrect amount");
        require(hasAccess() == false, "already boughtopl");

        payable(owner).transfer((msg.value * 80) / 100);
        payable(charity).transfer((msg.value * 20) / 100);

        sales[msg.sender] = true;
        totalSales = totalSales + 1;
        return true;
    }
}
