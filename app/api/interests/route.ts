import { createClient } from "@/lib/supabase/server"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { skillIds } = await request.json()

    // Clear existing interests
    await supabase.from("user_interests").delete().eq("user_id", userData.user.id)

    // Add new interests
    const interests = skillIds.map((skillId: string) => ({
      user_id: userData.user.id,
      skill_id: skillId,
      level: 1,
    }))

    const { error } = await supabase.from("user_interests").insert(interests)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update interests" },
      { status: 500 },
    )
  }
}
