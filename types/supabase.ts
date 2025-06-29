Need to install the following packages:
supabase@2.24.3
Ok to proceed? (y) export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      AccessControl: {
        Row: {
          access_role: Database["public"]["Enums"]["access_role"]
          date_added: string | null
          date_ended: string | null
          id: string
          worker_id: string
        }
        Insert: {
          access_role: Database["public"]["Enums"]["access_role"]
          date_added?: string | null
          date_ended?: string | null
          id?: string
          worker_id?: string
        }
        Update: {
          access_role?: Database["public"]["Enums"]["access_role"]
          date_added?: string | null
          date_ended?: string | null
          id?: string
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "AccessControl_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "BarangayWorker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "AccessControl_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "worker_no_roles"
            referencedColumns: ["worker_id"]
          },
        ]
      }
      BarangayAppointment: {
        Row: {
          barangay_name: string
          city: string | null
          city_old: string | null
          created_at: string
          email: string
          id: string
          message: string | null
          region: string | null
          region_old: string | null
          status: string | null
        }
        Insert: {
          barangay_name: string
          city?: string | null
          city_old?: string | null
          created_at?: string
          email: string
          id?: string
          message?: string | null
          region?: string | null
          region_old?: string | null
          status?: string | null
        }
        Update: {
          barangay_name?: string
          city?: string | null
          city_old?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          region?: string | null
          region_old?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "BarangayAppointment_city_fkey"
            columns: ["city"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "BarangayAppointment_region_fkey"
            columns: ["region"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      BarangayProfile: {
        Row: {
          about: string | null
          address: string | null
          badge_given: number | null
          badge_stock: number | null
          barangayName: string
          created_at: string
          id: string
          profile_pic: string | null
          user_id: string
          website: string | null
        }
        Insert: {
          about?: string | null
          address?: string | null
          badge_given?: number | null
          badge_stock?: number | null
          barangayName: string
          created_at?: string
          id?: string
          profile_pic?: string | null
          user_id: string
          website?: string | null
        }
        Update: {
          about?: string | null
          address?: string | null
          badge_given?: number | null
          badge_stock?: number | null
          barangayName?: string
          created_at?: string
          id?: string
          profile_pic?: string | null
          user_id?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "barangay_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "email_user_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      BarangayWorker: {
        Row: {
          access_control_id: string | null
          barangay_id: string
          citizen_id: string
          date_ended: string | null
          date_started: string | null
          id: string
          position: string
        }
        Insert: {
          access_control_id?: string | null
          barangay_id?: string
          citizen_id?: string
          date_ended?: string | null
          date_started?: string | null
          id?: string
          position: string
        }
        Update: {
          access_control_id?: string | null
          barangay_id?: string
          citizen_id?: string
          date_ended?: string | null
          date_started?: string | null
          id?: string
          position?: string
        }
        Relationships: [
          {
            foreignKeyName: "BarangayWorker_access_control_id_fkey"
            columns: ["access_control_id"]
            isOneToOne: false
            referencedRelation: "AccessControl"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "BarangayWorker_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "barangay_mainbar"
            referencedColumns: ["barangay_id"]
          },
          {
            foreignKeyName: "BarangayWorker_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "BarangayProfile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "BarangayWorker_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "citizen_worker"
            referencedColumns: ["barangay_id"]
          },
          {
            foreignKeyName: "BarangayWorker_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "worker_no_roles"
            referencedColumns: ["barangay_id"]
          },
          {
            foreignKeyName: "BarangayWorker_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "worker_roles_view"
            referencedColumns: ["barangay_id"]
          },
          {
            foreignKeyName: "BarangayWorker_citizen_id_fkey"
            columns: ["citizen_id"]
            isOneToOne: false
            referencedRelation: "citizen_worker"
            referencedColumns: ["citizen_id"]
          },
          {
            foreignKeyName: "BarangayWorker_citizen_id_fkey"
            columns: ["citizen_id"]
            isOneToOne: false
            referencedRelation: "CitizenProfile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "BarangayWorker_citizen_id_fkey"
            columns: ["citizen_id"]
            isOneToOne: false
            referencedRelation: "worker_no_roles"
            referencedColumns: ["citizen_id"]
          },
          {
            foreignKeyName: "BarangayWorker_citizen_id_fkey"
            columns: ["citizen_id"]
            isOneToOne: false
            referencedRelation: "worker_roles_view"
            referencedColumns: ["citizen_id"]
          },
        ]
      }
      cities: {
        Row: {
          id: string
          name: string
          region_id: string | null
        }
        Insert: {
          id?: string
          name: string
          region_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          region_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cities_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      CitizenProfile: {
        Row: {
          accumulatedBadge: number
          barangay: string
          barangay_id: string | null
          birthdate: string | null
          birthplace: string | null
          citizenship: string | null
          city: string | null
          created_at: string
          currentBadge: number
          employment: string | null
          first_name: string | null
          highest_education:
            | Database["public"]["Enums"]["highest_education"]
            | null
          id: string
          is_worker: boolean | null
          last_name: string | null
          middle_name: string | null
          mobile_number: string | null
          other_information: string[] | null
          profile_pic: string | null
          province: string | null
          region: string | null
          religion: string | null
          sex: Database["public"]["Enums"]["sex"]
          sitio: string | null
          suffix: string | null
          telephone_number: string | null
          user_id: string | null
          years_of_residence: number | null
        }
        Insert: {
          accumulatedBadge?: number
          barangay: string
          barangay_id?: string | null
          birthdate?: string | null
          birthplace?: string | null
          citizenship?: string | null
          city?: string | null
          created_at?: string
          currentBadge?: number
          employment?: string | null
          first_name?: string | null
          highest_education?:
            | Database["public"]["Enums"]["highest_education"]
            | null
          id?: string
          is_worker?: boolean | null
          last_name?: string | null
          middle_name?: string | null
          mobile_number?: string | null
          other_information?: string[] | null
          profile_pic?: string | null
          province?: string | null
          region?: string | null
          religion?: string | null
          sex?: Database["public"]["Enums"]["sex"]
          sitio?: string | null
          suffix?: string | null
          telephone_number?: string | null
          user_id?: string | null
          years_of_residence?: number | null
        }
        Update: {
          accumulatedBadge?: number
          barangay?: string
          barangay_id?: string | null
          birthdate?: string | null
          birthplace?: string | null
          citizenship?: string | null
          city?: string | null
          created_at?: string
          currentBadge?: number
          employment?: string | null
          first_name?: string | null
          highest_education?:
            | Database["public"]["Enums"]["highest_education"]
            | null
          id?: string
          is_worker?: boolean | null
          last_name?: string | null
          middle_name?: string | null
          mobile_number?: string | null
          other_information?: string[] | null
          profile_pic?: string | null
          province?: string | null
          region?: string | null
          religion?: string | null
          sex?: Database["public"]["Enums"]["sex"]
          sitio?: string | null
          suffix?: string | null
          telephone_number?: string | null
          user_id?: string | null
          years_of_residence?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "CitizenProfile_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "barangay_mainbar"
            referencedColumns: ["barangay_id"]
          },
          {
            foreignKeyName: "CitizenProfile_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "BarangayProfile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "CitizenProfile_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "citizen_worker"
            referencedColumns: ["barangay_id"]
          },
          {
            foreignKeyName: "CitizenProfile_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "worker_no_roles"
            referencedColumns: ["barangay_id"]
          },
          {
            foreignKeyName: "CitizenProfile_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "worker_roles_view"
            referencedColumns: ["barangay_id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "email_user_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      Contact: {
        Row: {
          barangay_id: string | null
          created_at: string
          id: string
          name: string
          number: string
        }
        Insert: {
          barangay_id?: string | null
          created_at?: string
          id?: string
          name: string
          number: string
        }
        Update: {
          barangay_id?: string | null
          created_at?: string
          id?: string
          name?: string
          number?: string
        }
        Relationships: [
          {
            foreignKeyName: "Contact_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "barangay_mainbar"
            referencedColumns: ["barangay_id"]
          },
          {
            foreignKeyName: "Contact_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "BarangayProfile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Contact_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "citizen_worker"
            referencedColumns: ["barangay_id"]
          },
          {
            foreignKeyName: "Contact_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "worker_no_roles"
            referencedColumns: ["barangay_id"]
          },
          {
            foreignKeyName: "Contact_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "worker_roles_view"
            referencedColumns: ["barangay_id"]
          },
        ]
      }
      Hotline: {
        Row: {
          barangay_id: string
          id: string
          number: string | null
          title: string | null
        }
        Insert: {
          barangay_id?: string
          id?: string
          number?: string | null
          title?: string | null
        }
        Update: {
          barangay_id?: string
          id?: string
          number?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Hotline_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "barangay_mainbar"
            referencedColumns: ["barangay_id"]
          },
          {
            foreignKeyName: "Hotline_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "BarangayProfile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Hotline_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "citizen_worker"
            referencedColumns: ["barangay_id"]
          },
          {
            foreignKeyName: "Hotline_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "worker_no_roles"
            referencedColumns: ["barangay_id"]
          },
          {
            foreignKeyName: "Hotline_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "worker_roles_view"
            referencedColumns: ["barangay_id"]
          },
        ]
      }
      Petition: {
        Row: {
          barangay: string
          created_at: string
          email: string
          file_upload: string | null
          first_name: string
          id: number
          last_name: string
        }
        Insert: {
          barangay: string
          created_at?: string
          email: string
          file_upload?: string | null
          first_name: string
          id?: number
          last_name: string
        }
        Update: {
          barangay?: string
          created_at?: string
          email?: string
          file_upload?: string | null
          first_name?: string
          id?: number
          last_name?: string
        }
        Relationships: []
      }
      Post: {
        Row: {
          content: string
          id: string
          is_pinned: boolean | null
          media: string | null
          no_of_likes: number | null
          no_of_views: number | null
          owner: string
          time_uploaded: string
        }
        Insert: {
          content: string
          id?: string
          is_pinned?: boolean | null
          media?: string | null
          no_of_likes?: number | null
          no_of_views?: number | null
          owner: string
          time_uploaded: string
        }
        Update: {
          content?: string
          id?: string
          is_pinned?: boolean | null
          media?: string | null
          no_of_likes?: number | null
          no_of_views?: number | null
          owner?: string
          time_uploaded?: string
        }
        Relationships: [
          {
            foreignKeyName: "Post_owner_fkey1"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "email_user_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      regions: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      ReportCase: {
        Row: {
          id: string
          issue: string | null
          service_id: string
        }
        Insert: {
          id?: string
          issue?: string | null
          service_id?: string
        }
        Update: {
          id?: string
          issue?: string | null
          service_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ReportCase_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "Services"
            referencedColumns: ["id"]
          },
        ]
      }
      RequestFiles: {
        Row: {
          created_at: string
          file_name: string
          id: string
          request_id: string
        }
        Insert: {
          created_at?: string
          file_name: string
          id: string
          request_id?: string
        }
        Update: {
          created_at?: string
          file_name?: string
          id?: string
          request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "RequestFiles_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "Requests"
            referencedColumns: ["id"]
          },
        ]
      }
      Requests: {
        Row: {
          added_date: string
          customer_id: string | null
          id: string
          is_paid: boolean
          owner: string
          ratings: number | null
          request_files: string | null
          schedule_date: string | null
          service_id: string
          status: Database["public"]["Enums"]["request_status"]
        }
        Insert: {
          added_date?: string
          customer_id?: string | null
          id?: string
          is_paid: boolean
          owner: string
          ratings?: number | null
          request_files?: string | null
          schedule_date?: string | null
          service_id: string
          status?: Database["public"]["Enums"]["request_status"]
        }
        Update: {
          added_date?: string
          customer_id?: string | null
          id?: string
          is_paid?: boolean
          owner?: string
          ratings?: number | null
          request_files?: string | null
          schedule_date?: string | null
          service_id?: string
          status?: Database["public"]["Enums"]["request_status"]
        }
        Relationships: [
          {
            foreignKeyName: "Requests_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "citizen_worker"
            referencedColumns: ["citizen_id"]
          },
          {
            foreignKeyName: "Requests_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "CitizenProfile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Requests_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "worker_no_roles"
            referencedColumns: ["citizen_id"]
          },
          {
            foreignKeyName: "Requests_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "worker_roles_view"
            referencedColumns: ["citizen_id"]
          },
          {
            foreignKeyName: "Requests_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "userroles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "Requests_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "Services"
            referencedColumns: ["id"]
          },
        ]
      }
      Services: {
        Row: {
          agreement_fee: number
          allow_attach_file: boolean
          category: Database["public"]["Enums"]["service_category"] | null
          convenience_fee: number
          date_closed: string | null
          date_created: string | null
          description: string | null
          display_badge: boolean | null
          eligible_for_badges: boolean | null
          end_date: string | null
          id: string
          image: string | null
          no_of_avail: number | null
          owner: string
          payment_type: Database["public"]["Enums"]["payment_type"]
          percentage: number
          ratings: number | null
          service_cost: number
          start_date: string | null
          status: Database["public"]["Enums"]["status"]
          title: string | null
          total_price: number
          type: Database["public"]["Enums"]["service_type"] | null
        }
        Insert: {
          agreement_fee: number
          allow_attach_file: boolean
          category?: Database["public"]["Enums"]["service_category"] | null
          convenience_fee: number
          date_closed?: string | null
          date_created?: string | null
          description?: string | null
          display_badge?: boolean | null
          eligible_for_badges?: boolean | null
          end_date?: string | null
          id?: string
          image?: string | null
          no_of_avail?: number | null
          owner: string
          payment_type?: Database["public"]["Enums"]["payment_type"]
          percentage?: number
          ratings?: number | null
          service_cost: number
          start_date?: string | null
          status: Database["public"]["Enums"]["status"]
          title?: string | null
          total_price: number
          type?: Database["public"]["Enums"]["service_type"] | null
        }
        Update: {
          agreement_fee?: number
          allow_attach_file?: boolean
          category?: Database["public"]["Enums"]["service_category"] | null
          convenience_fee?: number
          date_closed?: string | null
          date_created?: string | null
          description?: string | null
          display_badge?: boolean | null
          eligible_for_badges?: boolean | null
          end_date?: string | null
          id?: string
          image?: string | null
          no_of_avail?: number | null
          owner?: string
          payment_type?: Database["public"]["Enums"]["payment_type"]
          percentage?: number
          ratings?: number | null
          service_cost?: number
          start_date?: string | null
          status?: Database["public"]["Enums"]["status"]
          title?: string | null
          total_price?: number
          type?: Database["public"]["Enums"]["service_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "Services_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "userroles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      TransactionChats: {
        Row: {
          id: string
          message: string
          request_id: string
          sender_id: string
          sent_at: string
        }
        Insert: {
          id?: string
          message: string
          request_id: string
          sender_id: string
          sent_at: string
        }
        Update: {
          id?: string
          message?: string
          request_id?: string
          sender_id?: string
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "TransactionChats_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "Requests"
            referencedColumns: ["id"]
          },
        ]
      }
      TransactionRemarks: {
        Row: {
          content: string
          id: string
          request_id: string
          sent_at: string
        }
        Insert: {
          content: string
          id?: string
          request_id?: string
          sent_at?: string
        }
        Update: {
          content?: string
          id?: string
          request_id?: string
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "Remarks_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "Requests"
            referencedColumns: ["id"]
          },
        ]
      }
      UnverifiedCitizens: {
        Row: {
          barangay: string
          barangay_id: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          status: Database["public"]["Enums"]["citizenStatus"] | null
        }
        Insert: {
          barangay: string
          barangay_id?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          status?: Database["public"]["Enums"]["citizenStatus"] | null
        }
        Update: {
          barangay?: string
          barangay_id?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          status?: Database["public"]["Enums"]["citizenStatus"] | null
        }
        Relationships: [
          {
            foreignKeyName: "UnverifiedCitizens_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "barangay_mainbar"
            referencedColumns: ["barangay_id"]
          },
          {
            foreignKeyName: "UnverifiedCitizens_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "BarangayProfile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UnverifiedCitizens_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "citizen_worker"
            referencedColumns: ["barangay_id"]
          },
          {
            foreignKeyName: "UnverifiedCitizens_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "worker_no_roles"
            referencedColumns: ["barangay_id"]
          },
          {
            foreignKeyName: "UnverifiedCitizens_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "worker_roles_view"
            referencedColumns: ["barangay_id"]
          },
        ]
      }
      userroles: {
        Row: {
          created_at: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "userroles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "email_user_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      verification_tokens: {
        Row: {
          access_role: string
          barangay_user_id: string
          citizen_email: string
          expires_at: string
          id: string
          used: boolean | null
        }
        Insert: {
          access_role: string
          barangay_user_id: string
          citizen_email: string
          expires_at: string
          id?: string
          used?: boolean | null
        }
        Update: {
          access_role?: string
          barangay_user_id?: string
          citizen_email?: string
          expires_at?: string
          id?: string
          used?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      barangay_mainbar: {
        Row: {
          about: string | null
          badge_stock: number | null
          barangay_address: string | null
          barangay_id: string | null
          barangay_name: string | null
          officials_count: number | null
          profile_pic: string | null
          residents_count: number | null
        }
        Insert: {
          about?: string | null
          badge_stock?: number | null
          barangay_address?: string | null
          barangay_id?: string | null
          barangay_name?: string | null
          officials_count?: never
          profile_pic?: string | null
          residents_count?: never
        }
        Update: {
          about?: string | null
          badge_stock?: number | null
          barangay_address?: string | null
          barangay_id?: string | null
          barangay_name?: string | null
          officials_count?: never
          profile_pic?: string | null
          residents_count?: never
        }
        Relationships: []
      }
      citizen_worker: {
        Row: {
          barangay_address: string | null
          barangay_id: string | null
          citizen_id: string | null
          date_ended: string | null
          date_started: string | null
          first_name: string | null
          last_name: string | null
          middle_name: string | null
          position: string | null
          profile_pic: string | null
        }
        Relationships: []
      }
      email_user_view: {
        Row: {
          email: string | null
          user_id: string | null
        }
        Insert: {
          email?: string | null
          user_id?: string | null
        }
        Update: {
          email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      worker_no_roles: {
        Row: {
          barangay_address: string | null
          barangay_id: string | null
          citizen_id: string | null
          first_name: string | null
          last_name: string | null
          middle_name: string | null
          position: string | null
          worker_id: string | null
        }
        Relationships: []
      }
      worker_roles_view: {
        Row: {
          access_role: Database["public"]["Enums"]["access_role"] | null
          barangay_address: string | null
          barangay_id: string | null
          citizen_id: string | null
          date_added: string | null
          date_ended: string | null
          first_name: string | null
          last_name: string | null
          middle_name: string | null
          position: string | null
          profile_pic: string | null
          worker_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "AccessControl_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "BarangayWorker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "AccessControl_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "worker_no_roles"
            referencedColumns: ["worker_id"]
          },
        ]
      }
    }
    Functions: {
      get_requests_with_owner_name: {
        Args: { _customer_id: string }
        Returns: {
          id: string
          service_id: string
          is_paid: boolean
          schedule_date: string
          ratings: number
          request_files: string
          status: Database["public"]["Enums"]["request_status"]
          owner_id: string
          customer_id: string
          added_date: string
          service_title: string
          service_photo: string
          owner_name: string
          customer_fname: string
          customer_lname: string
          customer_mname: string
          customer_photo: string
        }[]
      }
      get_requests_with_service_id: {
        Args: { _service_id: string }
        Returns: {
          id: string
          service_id: string
          is_paid: boolean
          schedule_date: string
          ratings: number
          request_files: string
          status: Database["public"]["Enums"]["request_status"]
          owner_id: string
          customer_id: string
          added_date: string
          service_title: string
          service_photo: string
          service_cost: number
          owner_name: string
          customer_fname: string
          customer_lname: string
          customer_mname: string
          customer_photo: string
        }[]
      }
    }
    Enums: {
      access_role: "Chief Operator" | "Citizen Manager" | "Service Manager"
      citizenStatus: "Approved" | "Rejected" | "Pending"
      highest_education:
        | "No formal education"
        | "Elementary level"
        | "Elementary graduate"
        | "Junior high school level"
        | "Junior high school graduate"
        | "Senior high school level"
        | "Senior high school graduate"
        | "Vocational/Technical certificate"
        | "Some college (no degree)"
        | "Associate degree"
        | "Bachelor degree"
        | "Master degree"
        | "Doctorate/PhD"
        | "Prefer not to say"
      payment_type: "Fixed" | "Quote"
      region:
        | "Region I - Ilocos Region"
        | "Region II - Cagayan Valley"
        | "Region III - Central Luzon"
        | "Region IV - A - CALABARZON"
        | "Region V - Bicol Region"
        | "MIMAROPA"
        | "NCR - National Capital Region"
        | "CAR - Cordillera Administrative Region"
        | "Region VI - Western Visayas"
        | "Region VII - Central Visayas"
        | "Region VIII - Eastern Visayas"
        | "Region IX - Zamboanga Peninsula"
        | "Region X - Northern Mindanao"
        | "Region XI - Davao Region"
        | "Region XII - SOCCKSARGEN"
        | "Region XIII - Caraga"
        | "BARMM"
        | "NIR - Negros Island Region"
      request_status: "Pending" | "Ongoing" | "Completed" | "Canceled"
      service_category:
        | "Environmental"
        | "Livelihood Support"
        | "Education"
        | "Disaster Response"
        | "Infrastructure"
        | "Social Welfare"
        | "Health & Wellness"
        | "Beauty & Grooming"
        | "Therapeutic & Counseling"
        | "Coaching"
        | "Pet Care"
        | "Household"
        | "Legal & Certification"
        | "Other"
      service_type: "Personal" | "Event" | "Barangay"
      sex: "Male" | "Female" | "Non-binary" | "Prefer not to say"
      status: "Active" | "Closed"
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
    Enums: {
      access_role: ["Chief Operator", "Citizen Manager", "Service Manager"],
      citizenStatus: ["Approved", "Rejected", "Pending"],
      highest_education: [
        "No formal education",
        "Elementary level",
        "Elementary graduate",
        "Junior high school level",
        "Junior high school graduate",
        "Senior high school level",
        "Senior high school graduate",
        "Vocational/Technical certificate",
        "Some college (no degree)",
        "Associate degree",
        "Bachelor degree",
        "Master degree",
        "Doctorate/PhD",
        "Prefer not to say",
      ],
      payment_type: ["Fixed", "Quote"],
      region: [
        "Region I - Ilocos Region",
        "Region II - Cagayan Valley",
        "Region III - Central Luzon",
        "Region IV - A - CALABARZON",
        "Region V - Bicol Region",
        "MIMAROPA",
        "NCR - National Capital Region",
        "CAR - Cordillera Administrative Region",
        "Region VI - Western Visayas",
        "Region VII - Central Visayas",
        "Region VIII - Eastern Visayas",
        "Region IX - Zamboanga Peninsula",
        "Region X - Northern Mindanao",
        "Region XI - Davao Region",
        "Region XII - SOCCKSARGEN",
        "Region XIII - Caraga",
        "BARMM",
        "NIR - Negros Island Region",
      ],
      request_status: ["Pending", "Ongoing", "Completed", "Canceled"],
      service_category: [
        "Environmental",
        "Livelihood Support",
        "Education",
        "Disaster Response",
        "Infrastructure",
        "Social Welfare",
        "Health & Wellness",
        "Beauty & Grooming",
        "Therapeutic & Counseling",
        "Coaching",
        "Pet Care",
        "Household",
        "Legal & Certification",
        "Other",
      ],
      service_type: ["Personal", "Event", "Barangay"],
      sex: ["Male", "Female", "Non-binary", "Prefer not to say"],
      status: ["Active", "Closed"],
    },
  },
} as const
