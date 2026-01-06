package com.klu.main;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import com.klu.entity.Product;

import java.util.List;

public class ProductApp {

    public static void main(String[] args) {

          // Load Hibernate configuration
          Configuration conf = new Configuration().configure("hibernate.cfg.xml");
  
          // Create SessionFactory
          SessionFactory sf = conf.buildSessionFactory();
//
          // Open session
          Session s = sf.openSession();
//
          // Begin transaction
          Transaction tx = s.beginTransaction();
//
//        // INSERT operation
//        //Product p1 = new Product(101, "Pencil", 5, 55);
//        //Product p2 = new Product(102, "Pen", 10, 100);
//        Product p3 = new Product(103, "Notebook", 50, 40);
//
//        //s.persist(p1);
//       // s.persist(p2);
//        //s.persist(p3);
//
////        // READ single record
//          Product product = s.get(Product.class, 101);
//          System.out.println(product);
//  
//          // READ all records
//          List<Product> products =
//                  s.createQuery("FROM Product", Product.class).getResultList();
////
//          for (Product p : products) {
//              System.out.println(p);
//          }
//  
          // UPDATE record
          Product updateProduct = s.get(Product.class, 102);
          updateProduct.setPrice(15);
          updateProduct.setQuantity(120);
          s.merge(updateProduct);
 
          // DELETE record
          Product deleteProduct = s.get(Product.class, 103);
          s.remove(deleteProduct);
 
        // Commit transaction
        tx.commit();

        // Close session and SessionFactory
        s.close();
        sf.close();
    }
}
