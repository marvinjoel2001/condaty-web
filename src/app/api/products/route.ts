import { NextResponse } from "next/server";
import { Product } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function GET(request: Request) {
  try {
    const response = await fetch(`${API_URL}/products`);
    const products = await response.json();

    return NextResponse.json(products);
  } catch (error) {
    console.error("Products fetch error:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const token = request.headers.get("Authorization");

    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: token || "",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error creating product");
    }

    const product = await response.json();
    return NextResponse.json(product);
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json(
      { error: "Error al crear el producto" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id");
    const token = request.headers.get("Authorization");

    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        Authorization: token || "",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error updating product");
    }

    const product = await response.json();
    return NextResponse.json(product);
  } catch (error) {
    console.error("Product update error:", error);
    return NextResponse.json(
      { error: "Error al actualizar el producto" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const token = request.headers.get("Authorization");

    if (!id) {
      return NextResponse.json(
        { error: "ID no proporcionado" },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token || "",
      },
    });

    if (!response.ok) {
      throw new Error("Error deleting product");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Product deletion error:", error);
    return NextResponse.json(
      { error: "Error al eliminar el producto" },
      { status: 500 }
    );
  }
}
