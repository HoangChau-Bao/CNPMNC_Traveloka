// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const Voucher = new Schema(
//   {
//     voucherId: { type: Number },
//     catalogId: { type: Number },
//     name: { type: String },
//     content: { type: String },
//     pointCost: { type: Number },
//     discount: { type: Number },
//     quantity: { type: Number },
//     Code: { type: String },
//     partnerId: { type: String },
//     imageLink: { type: String },
//     preContent: { type: String },
//     slug: { type: String, slug: 'name', unique: true },
//     contentHeader: { type: String },
//     voucherNote: { type: String },
//   },
//   { timestamps: true },
// );

// module.exports = mongoose.model('Voucher', Voucher);

class Voucher {
  constructor(
    VoucherId,
    CatalogId,
    Name,
    PointCost,
    Discount,
    Quantity,
    Code,
    PartnerId,
    ImageLink,
    PreContent,
    ContentHeader,
    Contents,
    slug,
    CreateDate,
    ExpDate,
  ) {
    this.VoucherId = VoucherId;
    this.CatalogId = CatalogId;
    this.Name = Name;
    this.PointCost = PointCost;
    this.Discount = Discount;
    this.Quantity = Quantity;
    this.Code = Code;
    this.PartnerId = PartnerId;
    this.ImageLink = ImageLink;
    this.PreContent = PreContent;
    this.ContentHeader = ContentHeader;
    this.Contents = Contents;
    this.slug = slug;
    this.CreateDate = CreateDate;
    this.ExpDate = ExpDate;
  }
}

module.exports = Voucher;
