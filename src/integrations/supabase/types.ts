export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      b2b_employees: {
        Row: {
          b2b_partner_id: number | null
          b2b_partner_name: string
          created_at: string
          email: string | null
          employee_id: string
          first_name: string
          id: string
          last_name: string
          state: string
          updated_at: string
        }
        Insert: {
          b2b_partner_id?: number | null
          b2b_partner_name: string
          created_at?: string
          email?: string | null
          employee_id: string
          first_name: string
          id?: string
          last_name: string
          state?: string
          updated_at?: string
        }
        Update: {
          b2b_partner_id?: number | null
          b2b_partner_name?: string
          created_at?: string
          email?: string | null
          employee_id?: string
          first_name?: string
          id?: string
          last_name?: string
          state?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "b2b_employees_b2b_partner_id_fkey"
            columns: ["b2b_partner_id"]
            isOneToOne: false
            referencedRelation: "B2B_partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_b2b_partner"
            columns: ["b2b_partner_name"]
            isOneToOne: false
            referencedRelation: "B2B_partners"
            referencedColumns: ["name"]
          },
        ]
      }
      B2B_partners: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      blog_read_activity: {
        Row: {
          blog_id: string
          blog_link: string
          blog_title: string
          created_at: string
          id: string
          read_at: string
          user_id: string
        }
        Insert: {
          blog_id: string
          blog_link: string
          blog_title: string
          created_at?: string
          id?: string
          read_at?: string
          user_id: string
        }
        Update: {
          blog_id?: string
          blog_link?: string
          blog_title?: string
          created_at?: string
          id?: string
          read_at?: string
          user_id?: string
        }
        Relationships: []
      }
      completed_exercises: {
        Row: {
          assessment_id: string
          completed_at: string
          exercise_title: string
          id: string
          user_id: string
        }
        Insert: {
          assessment_id: string
          completed_at?: string
          exercise_title: string
          id?: string
          user_id: string
        }
        Update: {
          assessment_id?: string
          completed_at?: string
          exercise_title?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "completed_exercises_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "user_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      exercise_completion_clicks: {
        Row: {
          assessment_id: string
          clicked_at: string
          created_at: string
          exercise_title: string
          id: string
          is_active: boolean
          user_id: string
        }
        Insert: {
          assessment_id: string
          clicked_at?: string
          created_at?: string
          exercise_title: string
          id?: string
          is_active?: boolean
          user_id: string
        }
        Update: {
          assessment_id?: string
          clicked_at?: string
          created_at?: string
          exercise_title?: string
          id?: string
          is_active?: boolean
          user_id?: string
        }
        Relationships: []
      }
      exercise_feedback: {
        Row: {
          created_at: string
          exercise_title: string
          feedback_value: number
          id: string
          user_id: string
          video_id: string
        }
        Insert: {
          created_at?: string
          exercise_title: string
          feedback_value: number
          id?: string
          user_id: string
          video_id: string
        }
        Update: {
          created_at?: string
          exercise_title?: string
          feedback_value?: number
          id?: string
          user_id?: string
          video_id?: string
        }
        Relationships: []
      }
      favorite_blogs: {
        Row: {
          blog_description: string | null
          blog_id: string
          blog_image_url: string | null
          blog_link: string
          blog_title: string
          created_at: string
          id: string
          is_external: boolean
          user_id: string
        }
        Insert: {
          blog_description?: string | null
          blog_id: string
          blog_image_url?: string | null
          blog_link: string
          blog_title: string
          created_at?: string
          id?: string
          is_external?: boolean
          user_id: string
        }
        Update: {
          blog_description?: string | null
          blog_id?: string
          blog_image_url?: string | null
          blog_link?: string
          blog_title?: string
          created_at?: string
          id?: string
          is_external?: boolean
          user_id?: string
        }
        Relationships: []
      }
      favorite_exercises: {
        Row: {
          created_at: string
          description: string | null
          exercise_title: string
          id: string
          user_id: string
          video_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          exercise_title: string
          id?: string
          user_id: string
          video_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          exercise_title?: string
          id?: string
          user_id?: string
          video_id?: string
        }
        Relationships: []
      }
      follow_up_responses: {
        Row: {
          assessment_id: string
          created_at: string
          id: string
          pain_level: number
          responses: Json
          user_id: string
        }
        Insert: {
          assessment_id: string
          created_at?: string
          id?: string
          pain_level: number
          responses?: Json
          user_id: string
        }
        Update: {
          assessment_id?: string
          created_at?: string
          id?: string
          pain_level?: number
          responses?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follow_up_responses_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "user_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      hr_managers: {
        Row: {
          b2b_partner: number | null
          email: string
          id: string
          password_hash: string | null
        }
        Insert: {
          b2b_partner?: number | null
          email: string
          id?: string
          password_hash?: string | null
        }
        Update: {
          b2b_partner?: number | null
          email?: string
          id?: string
          password_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hr_managers_b2b_partner_fkey"
            columns: ["b2b_partner"]
            isOneToOne: false
            referencedRelation: "B2B_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      mood_entries: {
        Row: {
          created_at: string
          id: string
          mood_date: string
          mood_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mood_date: string
          mood_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mood_date?: string
          mood_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      msk_profiles: {
        Row: {
          b2b_eployee_id: string | null
          created_at: string
          id: string
          pain_areas: Json | null
          pain_level_followup: number | null
          pain_level_initial: number | null
        }
        Insert: {
          b2b_eployee_id?: string | null
          created_at?: string
          id?: string
          pain_areas?: Json | null
          pain_level_followup?: number | null
          pain_level_initial?: number | null
        }
        Update: {
          b2b_eployee_id?: string | null
          created_at?: string
          id?: string
          pain_areas?: Json | null
          pain_level_followup?: number | null
          pain_level_initial?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "msk_profiles_b2b_eployee_id_fkey"
            columns: ["b2b_eployee_id"]
            isOneToOne: false
            referencedRelation: "b2b_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_assessments: {
        Row: {
          id: string
          intial_pain_intensity: number | null
          pain_area: string
          primary_differential: string
          primary_mechanism: string
          program_ended_at: string | null
          program_start_date: string | null
          sin_group: string
          timestamp: string
          user_id: string
        }
        Insert: {
          id?: string
          intial_pain_intensity?: number | null
          pain_area: string
          primary_differential: string
          primary_mechanism: string
          program_ended_at?: string | null
          program_start_date?: string | null
          sin_group: string
          timestamp?: string
          user_id: string
        }
        Update: {
          id?: string
          intial_pain_intensity?: number | null
          pain_area?: string
          primary_differential?: string
          primary_mechanism?: string
          program_ended_at?: string | null
          program_start_date?: string | null
          sin_group?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: []
      }
      user_goals: {
        Row: {
          created_at: string
          goal_type: string
          goal_value: number
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          goal_type: string
          goal_value: number
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          goal_type?: string
          goal_value?: number
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          age: number | null
          b2b_partner_id: number | null
          created_at: string | null
          email: string | null
          employee_id: string | null
          employer_name: string | null
          first_name: string | null
          gender: string | null
          id: string
          job: string | null
          job_subtype: string | null
          last_name: string | null
          pain_area: string | null
          pain_level_followup: number | null
          pain_level_initial: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          age?: number | null
          b2b_partner_id?: number | null
          created_at?: string | null
          email?: string | null
          employee_id?: string | null
          employer_name?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          job?: string | null
          job_subtype?: string | null
          last_name?: string | null
          pain_area?: string | null
          pain_level_followup?: number | null
          pain_level_initial?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          age?: number | null
          b2b_partner_id?: number | null
          created_at?: string | null
          email?: string | null
          employee_id?: string | null
          employer_name?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          job?: string | null
          job_subtype?: string | null
          last_name?: string | null
          pain_area?: string | null
          pain_level_followup?: number | null
          pain_level_initial?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_b2b_partner_id_fkey"
            columns: ["b2b_partner_id"]
            isOneToOne: false
            referencedRelation: "B2B_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          b2b_employee_id: string | null
          created_at: string
          hr_manager_id: string | null
          id: string
          updated_at: string
          user_type: string
        }
        Insert: {
          b2b_employee_id?: string | null
          created_at?: string
          hr_manager_id?: string | null
          id: string
          updated_at?: string
          user_type: string
        }
        Update: {
          b2b_employee_id?: string | null
          created_at?: string
          hr_manager_id?: string | null
          id?: string
          updated_at?: string
          user_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_b2b_employee_id_fkey"
            columns: ["b2b_employee_id"]
            isOneToOne: false
            referencedRelation: "b2b_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_hr_manager_id_fkey"
            columns: ["hr_manager_id"]
            isOneToOne: false
            referencedRelation: "hr_managers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_latest_pain_level: {
        Args: { assessment_id_param: string; user_id_param: string }
        Returns: {
          pain_level: number
          created_at: string
        }[]
      }
      get_user_b2b_partner_id: {
        Args: { user_id: string }
        Returns: number
      }
      is_hr_manager: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
