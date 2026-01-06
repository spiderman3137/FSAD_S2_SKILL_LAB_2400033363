package com.klu.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
@Entity
@Table(name="prod")
public class Product {
	@Override
	public String toString() {
		return "Product [id=" + id + ", pname=" + pname + ", price=" + price + ", quantity=" + quantity + "]";
	}

	@Id
	private int id;
	private String pname;
	private float price;
	private int quantity;
	
	public Product() {
		// TODO Auto-generated constructor stub
	}

	public Product(int id, String pname, float price, int quantity) {
		super();
		this.id = id;
		this.pname = pname;
		this.price = price;
		this.quantity = quantity;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	
}
