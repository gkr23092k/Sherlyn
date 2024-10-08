import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class dataservice {

    data = [
        {
            name: 'gokul',
            material: 'watch',
            materialgroup: 'food',
            price: 5000,
            offer: 'no',
            date: new Date('1/1/2024'),
            entrydate: new Date('1/1/2024, 00:00:00'),
            comments: 'at dosaspecial birthday treat'
        },
        {
            name: 'arjun',
            material: 'laptop',
            materialgroup: 'electronics',
            price: 75000,
            offer: 'yes',
            date: new Date('2/5/2024'),
            entrydate: new Date('2/5/2024, 10:00:00'),
            comments: 'office purchase'
        },
        {
            name: 'mohan',
            material: 'shoes',
            materialgroup: 'apparel',
            price: 3000,
            offer: 'no',
            date: new Date('3/10/2024'),
            entrydate: new Date('3/10/2024, 14:00:00'),
            comments: 'running shoes'
        },
        {
            name: 'deepa',
            material: 'bag',
            materialgroup: 'accessories',
            price: 1500,
            offer: 'yes',
            date: new Date('4/15/2024'),
            entrydate: new Date('4/15/2024, 09:00:00'),
            comments: 'office bag'
        },
        {
            name: 'anita',
            material: 'mobile phone',
            materialgroup: 'electronics',
            price: 50000,
            offer: 'no',
            date: new Date('5/20/2024'),
            entrydate: new Date('5/20/2024, 12:00:00'),
            comments: 'personal use'
        },
        {
            name: 'suresh',
            material: 'table',
            materialgroup: 'furniture',
            price: 7000,
            offer: 'yes',
            date: new Date('6/25/2024'),
            entrydate: new Date('6/25/2024, 16:00:00'),
            comments: 'study table'
        },
        {
            name: 'rekha',
            material: 'dress',
            materialgroup: 'apparel',
            price: 2000,
            offer: 'no',
            date: new Date('7/30/2024'),
            entrydate: new Date('7/30/2024, 18:00:00'),
            comments: 'party wear'
        },
        {
            name: 'vijay',
            material: 'book',
            materialgroup: 'stationery',
            price: 500,
            offer: 'yes',
            date: new Date('8/4/2024'),
            entrydate: new Date('8/4/2024, 11:00:00'),
            comments: 'educational'
        },
        {
            name: 'meera',
            material: 'bicycle',
            materialgroup: 'sports',
            price: 12000,
            offer: 'no',
            date: new Date('9/9/2024'),
            entrydate: new Date('9/9/2024, 15:00:00'),
            comments: 'fitness'
        },
        {
            name: 'amit',
            material: 'headphones',
            materialgroup: 'electronics',
            price: 3000,
            offer: 'yes',
            date: new Date('10/14/2024'),
            entrydate: new Date('10/14/2024, 13:00:00'),
            comments: 'music lover'
        },
        {
            name: 'priya',
            material: 'jacket',
            materialgroup: 'apparel',
            price: 4000,
            offer: 'no',
            date: new Date('11/19/2024'),
            entrydate: new Date('11/19/2024, 17:00:00'),
            comments: 'winter wear'
        },
        {
            name: 'karthik',
            material: 'camera',
            materialgroup: 'electronics',
            price: 45000,
            offer: 'yes',
            date: new Date('12/24/2024'),
            entrydate: new Date('12/24/2024, 10:00:00'),
            comments: 'photography'
        },
        {
            name: 'latha',
            material: 'sofa',
            materialgroup: 'furniture',
            price: 25000,
            offer: 'no',
            date: new Date('1/29/2024'),
            entrydate: new Date('1/29/2024, 08:00:00'),
            comments: 'living room'
        },
        {
            name: 'rajesh',
            material: 'fridge',
            materialgroup: 'appliances',
            price: 30000,
            offer: 'yes',
            date: new Date('2/3/2024'),
            entrydate: new Date('2/3/2024, 14:00:00'),
            comments: 'kitchen'
        },
        {
            name: 'neha',
            material: 'guitar',
            materialgroup: 'musical instruments',
            price: 10000,
            offer: 'no',
            date: new Date('3/8/2024'),
            entrydate: new Date('3/8/2024, 09:00:00'),
            comments: 'music lessons'
        },  {
            name: 'gokul',
            material: 'watch',
            materialgroup: 'food',
            price: 5000,
            offer: 'no',
            date: new Date('1/1/2024'),
            entrydate: new Date('1/1/2024, 00:00:00'),
            comments: 'at dosaspecial birthday treat'
        },
        {
            name: 'arjun',
            material: 'laptop',
            materialgroup: 'electronics',
            price: 75000,
            offer: 'yes',
            date: new Date('2/5/2024'),
            entrydate: new Date('2/5/2024, 10:00:00'),
            comments: 'office purchase'
        },
        {
            name: 'mohan',
            material: 'shoes',
            materialgroup: 'apparel',
            price: 3000,
            offer: 'no',
            date: new Date('3/10/2024'),
            entrydate: new Date('3/10/2024, 14:00:00'),
            comments: 'running shoes'
        },
        {
            name: 'deepa',
            material: 'bag',
            materialgroup: 'accessories',
            price: 1500,
            offer: 'yes',
            date: new Date('4/15/2024'),
            entrydate: new Date('4/15/2024, 09:00:00'),
            comments: 'office bag'
        },
        {
            name: 'anita',
            material: 'mobile phone',
            materialgroup: 'electronics',
            price: 50000,
            offer: 'no',
            date: new Date('5/20/2024'),
            entrydate: new Date('5/20/2024, 12:00:00'),
            comments: 'personal use'
        },
        {
            name: 'suresh',
            material: 'table',
            materialgroup: 'furniture',
            price: 7000,
            offer: 'yes',
            date: new Date('6/25/2024'),
            entrydate: new Date('6/25/2024, 16:00:00'),
            comments: 'study table'
        },
        {
            name: 'rekha',
            material: 'dress',
            materialgroup: 'apparel',
            price: 2000,
            offer: 'no',
            date: new Date('7/30/2024'),
            entrydate: new Date('7/30/2024, 18:00:00'),
            comments: 'party wear'
        },
        {
            name: 'vijay',
            material: 'book',
            materialgroup: 'stationery',
            price: 500,
            offer: 'yes',
            date: new Date('8/4/2024'),
            entrydate: new Date('8/4/2024, 11:00:00'),
            comments: 'educational'
        },
        {
            name: 'meera',
            material: 'bicycle',
            materialgroup: 'sports',
            price: 12000,
            offer: 'no',
            date: new Date('9/9/2024'),
            entrydate: new Date('9/9/2024, 15:00:00'),
            comments: 'fitness'
        },
        {
            name: 'amit',
            material: 'headphones',
            materialgroup: 'electronics',
            price: 3000,
            offer: 'yes',
            date: new Date('10/14/2024'),
            entrydate: new Date('10/14/2024, 13:00:00'),
            comments: 'music lover'
        },
        {
            name: 'priya',
            material: 'jacket',
            materialgroup: 'apparel',
            price: 4000,
            offer: 'no',
            date: new Date('11/19/2024'),
            entrydate: new Date('11/19/2024, 17:00:00'),
            comments: 'winter wear'
        },
        {
            name: 'karthik',
            material: 'camera',
            materialgroup: 'electronics',
            price: 45000,
            offer: 'yes',
            date: new Date('12/24/2024'),
            entrydate: new Date('12/24/2024, 10:00:00'),
            comments: 'photography'
        },
        {
            name: 'latha',
            material: 'sofa',
            materialgroup: 'furniture',
            price: 25000,
            offer: 'no',
            date: new Date('1/29/2024'),
            entrydate: new Date('1/29/2024, 08:00:00'),
            comments: 'living room'
        },
        {
            name: 'rajesh',
            material: 'fridge',
            materialgroup: 'appliances',
            price: 30000,
            offer: 'yes',
            date: new Date('2/3/2024'),
            entrydate: new Date('2/3/2024, 14:00:00'),
            comments: 'kitchen'
        },
        {
            name: 'neha',
            material: 'guitar',
            materialgroup: 'musical instruments',
            price: 10000,
            offer: 'no',
            date: new Date('3/8/2024'),
            entrydate: new Date('3/8/2024, 09:00:00'),
            comments: 'music lessons'
        },  {
            name: 'gokul',
            material: 'watch',
            materialgroup: 'food',
            price: 5000,
            offer: 'no',
            date: new Date('1/1/2024'),
            entrydate: new Date('1/1/2024, 00:00:00'),
            comments: 'at dosaspecial birthday treat'
        },
        {
            name: 'arjun',
            material: 'laptop',
            materialgroup: 'electronics',
            price: 75000,
            offer: 'yes',
            date: new Date('2/5/2024'),
            entrydate: new Date('2/5/2024, 10:00:00'),
            comments: 'office purchase'
        },
        {
            name: 'mohan',
            material: 'shoes',
            materialgroup: 'apparel',
            price: 3000,
            offer: 'no',
            date: new Date('3/10/2024'),
            entrydate: new Date('3/10/2024, 14:00:00'),
            comments: 'running shoes'
        },
        {
            name: 'deepa',
            material: 'bag',
            materialgroup: 'accessories',
            price: 1500,
            offer: 'yes',
            date: new Date('4/15/2024'),
            entrydate: new Date('4/15/2024, 09:00:00'),
            comments: 'office bag'
        },
        {
            name: 'anita',
            material: 'mobile phone',
            materialgroup: 'electronics',
            price: 50000,
            offer: 'no',
            date: new Date('5/20/2024'),
            entrydate: new Date('5/20/2024, 12:00:00'),
            comments: 'personal use'
        },
        {
            name: 'suresh',
            material: 'table',
            materialgroup: 'furniture',
            price: 7000,
            offer: 'yes',
            date: new Date('6/25/2024'),
            entrydate: new Date('6/25/2024, 16:00:00'),
            comments: 'study table'
        },
        {
            name: 'rekha',
            material: 'dress',
            materialgroup: 'apparel',
            price: 2000,
            offer: 'no',
            date: new Date('7/30/2024'),
            entrydate: new Date('7/30/2024, 18:00:00'),
            comments: 'party wear'
        },
        {
            name: 'vijay',
            material: 'book',
            materialgroup: 'stationery',
            price: 500,
            offer: 'yes',
            date: new Date('8/4/2024'),
            entrydate: new Date('8/4/2024, 11:00:00'),
            comments: 'educational'
        },
        {
            name: 'meera',
            material: 'bicycle',
            materialgroup: 'sports',
            price: 12000,
            offer: 'no',
            date: new Date('9/9/2024'),
            entrydate: new Date('9/9/2024, 15:00:00'),
            comments: 'fitness'
        },
        {
            name: 'amit',
            material: 'headphones',
            materialgroup: 'electronics',
            price: 3000,
            offer: 'yes',
            date: new Date('10/14/2024'),
            entrydate: new Date('10/14/2024, 13:00:00'),
            comments: 'music lover'
        },
        {
            name: 'priya',
            material: 'jacket',
            materialgroup: 'apparel',
            price: 4000,
            offer: 'no',
            date: new Date('11/19/2024'),
            entrydate: new Date('11/19/2024, 17:00:00'),
            comments: 'winter wear'
        },
        {
            name: 'karthik',
            material: 'camera',
            materialgroup: 'electronics',
            price: 45000,
            offer: 'yes',
            date: new Date('12/24/2024'),
            entrydate: new Date('12/24/2024, 10:00:00'),
            comments: 'photography'
        },
        {
            name: 'latha',
            material: 'sofa',
            materialgroup: 'furniture',
            price: 25000,
            offer: 'no',
            date: new Date('1/29/2024'),
            entrydate: new Date('1/29/2024, 08:00:00'),
            comments: 'living room'
        },
        {
            name: 'rajesh',
            material: 'fridge',
            materialgroup: 'appliances',
            price: 30000,
            offer: 'yes',
            date: new Date('2/3/2024'),
            entrydate: new Date('2/3/2024, 14:00:00'),
            comments: 'kitchen'
        },
        {
            name: 'neha',
            material: 'guitar',
            materialgroup: 'musical instruments',
            price: 10000,
            offer: 'no',
            date: new Date('3/8/2024'),
            entrydate: new Date('3/8/2024, 09:00:00'),
            comments: 'music lessons'
        }
    ];



    getData() {
        return this.data;
    }
}