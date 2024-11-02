import db from "@/lib/db";

export async function GET(req: Request) {
  const [rows] = await db.query("SELECT * FROM items");
  return new Response(JSON.stringify(rows), { status: 200 });
}

export async function POST(req: Request) {
  const { name, description } = await req.json();
  const [result]: any = await db.query(
    "INSERT INTO items (name, description) VALUES (?, ?)",
    [name, description]
  );
  return new Response(
    JSON.stringify({ id: result.insertId, name, description }),
    { status: 201 }
  );
}

export async function PUT(req: Request) {
  const { id, name, description } = await req.json();
  await db.query("UPDATE items SET name = ?, description = ? WHERE id = ?", [
    name,
    description,
    id,
  ]);
  return new Response(JSON.stringify({ id, name, description }), {
    status: 200,
  });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await db.query("DELETE FROM items WHERE id = ?", [id]);
  return new Response(JSON.stringify({ message: "Item deleted" }), {
    status: 200,
  });
}
