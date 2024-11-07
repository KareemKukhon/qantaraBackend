class SellerDTO {
    constructor(seller) {
      this.id = seller._id;
      this.sellerName = seller.sellerName;
      this.phoneNumber = seller.phoneNumber;
      this.storeName = seller.storeName;
      this.commercialRecord = seller.commercialRecord;
      this.country = seller.country;
      this.city = seller.city;
      this.area = seller.area;
      this.location = seller.location;
      this.createdAt = seller.createdAt;
      this.updatedAt = seller.updatedAt;
    }
  }
  
  module.exports = { SellerDTO };
  