import { useEffect, useState } from "react";
import {
  Save,
  RefreshCw,
  Check,
  AlertCircle,
  Store,
  Globe2,
  Bell,
  ShieldCheck,
  Palette,
  QrCode,
  Phone,
  Mail,
  MapPin,
  Clock3,
  Eye,
  EyeOff,
  Lock,
  Smartphone,
  Languages,
  CircleDollarSign,
  Image as ImageIcon,
  Upload,
} from "lucide-react";

import AdminLayout from "../../components/admin/AdminLayout";

/* =========================================================
   DEFAULT SETTINGS
========================================================= */

const defaultSettings = {
  cafe: {
    name: "Cafe",
    description:
      "Fresh coffee, delicious food and a warm atmosphere.",
    phone: "",
    email: "",
    address: "",
    website: "",
  },

  menu: {
    currency: "ETB",
    defaultLanguage: "en",
    showPrices: true,
    showImages: true,
    showDescriptions: true,
    showIngredients: true,
    allowSearch: true,
    allowCategoryFilter: true,
  },

  languages: {
    english: true,
    amharic: true,
    oromo: true,
  },

  notifications: {
    newMenuItem: true,
    lowAvailability: true,
    systemUpdates: true,
  },

  appearance: {
    theme: "warm",
    accentColor: "#8b4f2f",
  },

  security: {
    twoFactor: false,
  },
};

/* =========================================================
   COMPONENT
========================================================= */

function AdminSettings() {
  const [settings, setSettings] =
    useState(defaultSettings);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [activeSection, setActiveSection] =
    useState("cafe");

  const [showPassword, setShowPassword] =
    useState(false);

  const [passwordForm, setPasswordForm] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  /* =======================================================
     LOAD SETTINGS
  ======================================================= */

  useEffect(() => {
    const loadSettings = () => {
      try {
        const saved =
          localStorage.getItem(
            "cafe_admin_settings"
          );

        if (saved) {
          const parsed = JSON.parse(saved);

          setSettings((previous) => ({
            ...previous,
            ...parsed,

            cafe: {
              ...previous.cafe,
              ...parsed.cafe,
            },

            menu: {
              ...previous.menu,
              ...parsed.menu,
            },

            languages: {
              ...previous.languages,
              ...parsed.languages,
            },

            notifications: {
              ...previous.notifications,
              ...parsed.notifications,
            },

            appearance: {
              ...previous.appearance,
              ...parsed.appearance,
            },

            security: {
              ...previous.security,
              ...parsed.security,
            },
          }));
        }
      } catch (err) {
        console.error(
          "Load settings error:",
          err
        );

        setError(
          "Unable to load saved settings."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  /* =======================================================
     UPDATE NESTED FIELD
  ======================================================= */

  const updateSectionField = (
    section,
    field,
    value
  ) => {
    setSettings((previous) => ({
      ...previous,

      [section]: {
        ...previous[section],
        [field]: value,
      },
    }));
  };

  /* =======================================================
     SAVE SETTINGS
  ======================================================= */

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      localStorage.setItem(
        "cafe_admin_settings",
        JSON.stringify(settings)
      );

      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      setSuccess(
        "Settings saved successfully."
      );

      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (err) {
      console.error(
        "Save settings error:",
        err
      );

      setError(
        "Failed to save settings."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     RESET SETTINGS
  ======================================================= */

  const handleReset = () => {
    const confirmed =
      window.confirm(
        "Reset all settings to their default values?"
      );

    if (!confirmed) return;

    setSettings(defaultSettings);

    localStorage.removeItem(
      "cafe_admin_settings"
    );

    setSuccess(
      "Settings have been reset."
    );

    setTimeout(() => {
      setSuccess("");
    }, 2500);
  };

  /* =======================================================
     PASSWORD
  ======================================================= */

  const updatePasswordField = (
    field,
    value
  ) => {
    setPasswordForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      setError(
        "Please complete all password fields."
      );

      return;
    }

    if (
      passwordForm.newPassword.length < 6
    ) {
      setError(
        "New password must contain at least 6 characters."
      );

      return;
    }

    if (
      passwordForm.newPassword !==
      passwordForm.confirmPassword
    ) {
      setError(
        "New passwords do not match."
      );

      return;
    }

    /*
     * Password API can be connected here later.
     */

    setSuccess(
      "Password validation completed. Connect this form to your authentication API to update the account password."
    );

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  /* =======================================================
     LANGUAGE COUNT
  ======================================================= */

  const enabledLanguages =
    Object.values(
      settings.languages
    ).filter(Boolean).length;

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#eadfd6] border-t-[#8b4f2f]" />

            <p className="text-sm text-[#81736a]">
              Loading settings...
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-7xl pb-24">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-7">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#a27a60]">
                Cafe Administration
              </p>

              <h1 className="font-serif text-3xl font-semibold text-[#3a2418] sm:text-4xl">
                Settings
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#81736a]">
                Manage your cafe profile, customer
                menu, languages, notifications,
                appearance and security.
              </p>
            </div>

            {/* DESKTOP ACTIONS */}

            <div className="hidden gap-3 sm:flex">

              <button
                type="button"
                onClick={handleReset}
                className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-[#dfd2c8] bg-white px-4 text-sm font-semibold text-[#69584e] transition hover:bg-[#f4ebe4]"
              >
                <RefreshCw size={16} />
                Reset
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#8b4f2f] px-5 text-sm font-semibold text-white shadow-lg shadow-[#8b4f2f]/15 transition hover:bg-[#754126] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <RefreshCw
                      size={16}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>

            </div>

          </div>

        </div>

        {/* =================================================
            ALERTS
        ================================================= */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-[#efcfc7] bg-[#fff4f1] p-4 text-sm text-[#9b493b]">

            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0"
            />

            <span>{error}</span>

          </div>
        )}

        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-[#cfe0ca] bg-[#f1f7ef] p-4 text-sm text-[#52734e]">

            <Check
              size={19}
              className="mt-0.5 shrink-0"
            />

            <span>{success}</span>

          </div>
        )}

        {/* =================================================
            MOBILE SECTION NAVIGATION
        ================================================= */}

        <div className="mb-5 overflow-x-auto lg:hidden">

          <div className="flex min-w-max gap-2 pb-1">

            <SectionNavButton
              active={activeSection === "cafe"}
              onClick={() =>
                setActiveSection("cafe")
              }
              icon={Store}
              label="Cafe"
            />

            <SectionNavButton
              active={activeSection === "menu"}
              onClick={() =>
                setActiveSection("menu")
              }
              icon={QrCode}
              label="Menu"
            />

            <SectionNavButton
              active={
                activeSection === "languages"
              }
              onClick={() =>
                setActiveSection(
                  "languages"
                )
              }
              icon={Languages}
              label="Languages"
            />

            <SectionNavButton
              active={
                activeSection ===
                "notifications"
              }
              onClick={() =>
                setActiveSection(
                  "notifications"
                )
              }
              icon={Bell}
              label="Notifications"
            />

            <SectionNavButton
              active={
                activeSection === "appearance"
              }
              onClick={() =>
                setActiveSection(
                  "appearance"
                )
              }
              icon={Palette}
              label="Appearance"
            />

            <SectionNavButton
              active={
                activeSection === "security"
              }
              onClick={() =>
                setActiveSection(
                  "security"
                )
              }
              icon={ShieldCheck}
              label="Security"
            />

          </div>

        </div>

        {/* =================================================
            DESKTOP / CONTENT
        ================================================= */}

        <div className="grid gap-6 lg:grid-cols-[250px_1fr]">

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="hidden lg:block">

            <div className="sticky top-6 rounded-3xl border border-[#eadfd6] bg-white p-3 shadow-sm">

              <SettingsNavItem
                active={
                  activeSection === "cafe"
                }
                onClick={() =>
                  setActiveSection("cafe")
                }
                icon={Store}
                title="Cafe Profile"
                description="Business information"
              />

              <SettingsNavItem
                active={
                  activeSection === "menu"
                }
                onClick={() =>
                  setActiveSection("menu")
                }
                icon={QrCode}
                title="Customer Menu"
                description="Menu display options"
              />

              <SettingsNavItem
                active={
                  activeSection ===
                  "languages"
                }
                onClick={() =>
                  setActiveSection(
                    "languages"
                  )
                }
                icon={Globe2}
                title="Languages"
                description={`${enabledLanguages} languages enabled`}
              />

              <SettingsNavItem
                active={
                  activeSection ===
                  "notifications"
                }
                onClick={() =>
                  setActiveSection(
                    "notifications"
                  )
                }
                icon={Bell}
                title="Notifications"
                description="Notification preferences"
              />

              <SettingsNavItem
                active={
                  activeSection ===
                  "appearance"
                }
                onClick={() =>
                  setActiveSection(
                    "appearance"
                  )
                }
                icon={Palette}
                title="Appearance"
                description="Branding and theme"
              />

              <SettingsNavItem
                active={
                  activeSection ===
                  "security"
                }
                onClick={() =>
                  setActiveSection(
                    "security"
                  )
                }
                icon={ShieldCheck}
                title="Security"
                description="Password and protection"
              />

            </div>

          </aside>

          {/* =================================================
              SETTINGS CONTENT
          ================================================= */}

          <main className="min-w-0">

            {/* =================================================
                CAFE PROFILE
            ================================================= */}

            {activeSection === "cafe" && (
              <SettingsCard
                icon={Store}
                number="01"
                title="Cafe Profile"
                description="Basic information displayed throughout your cafe experience."
              >

                <div className="mb-7 flex flex-col gap-5 rounded-2xl bg-[#faf7f2] p-5 sm:flex-row sm:items-center">

                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#8b4f2f] text-white shadow-lg shadow-[#8b4f2f]/20">

                    <Store size={30} />

                  </div>

                  <div className="flex-1">

                    <p className="text-sm font-semibold text-[#3a2418]">
                      Cafe Branding
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#81736a]">
                      Your cafe name and identity
                      appear across the customer
                      menu.
                    </p>

                  </div>

                  <button
                    type="button"
                    className="flex h-10 items-center justify-center gap-2 rounded-xl border border-[#dfd2c8] bg-white px-4 text-xs font-semibold text-[#69584e] transition hover:bg-[#f4ebe4]"
                  >
                    <Upload size={14} />
                    Upload Logo
                  </button>

                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  <Field
                    label="Cafe Name"
                    required
                  >
                    <Input
                      value={
                        settings.cafe.name
                      }
                      onChange={(value) =>
                        updateSectionField(
                          "cafe",
                          "name",
                          value
                        )
                      }
                      placeholder="Your cafe name"
                      icon={Store}
                    />
                  </Field>

                  <Field
                    label="Phone Number"
                  >
                    <Input
                      value={
                        settings.cafe.phone
                      }
                      onChange={(value) =>
                        updateSectionField(
                          "cafe",
                          "phone",
                          value
                        )
                      }
                      placeholder="+251 9..."
                      icon={Phone}
                      type="tel"
                    />
                  </Field>

                  <Field
                    label="Email Address"
                  >
                    <Input
                      value={
                        settings.cafe.email
                      }
                      onChange={(value) =>
                        updateSectionField(
                          "cafe",
                          "email",
                          value
                        )
                      }
                      placeholder="hello@cafe.com"
                      icon={Mail}
                      type="email"
                    />
                  </Field>

                  <Field
                    label="Website"
                  >
                    <Input
                      value={
                        settings.cafe.website
                      }
                      onChange={(value) =>
                        updateSectionField(
                          "cafe",
                          "website",
                          value
                        )
                      }
                      placeholder="https://..."
                    />
                  </Field>

                  <div className="sm:col-span-2">

                    <Field
                      label="Address"
                    >
                      <Input
                        value={
                          settings.cafe
                            .address
                        }
                        onChange={(value) =>
                          updateSectionField(
                            "cafe",
                            "address",
                            value
                          )
                        }
                        placeholder="Cafe address"
                        icon={MapPin}
                      />
                    </Field>

                  </div>

                  <div className="sm:col-span-2">

                    <Field
                      label="Cafe Description"
                    >
                      <textarea
                        value={
                          settings.cafe
                            .description
                        }
                        onChange={(event) =>
                          updateSectionField(
                            "cafe",
                            "description",
                            event.target
                              .value
                          )
                        }
                        rows={4}
                        placeholder="Tell customers about your cafe..."
                        className={textareaClass}
                      />
                    </Field>

                  </div>

                </div>

              </SettingsCard>
            )}

            {/* =================================================
                CUSTOMER MENU
            ================================================= */}

            {activeSection === "menu" && (
              <SettingsCard
                icon={QrCode}
                number="02"
                title="Customer Menu"
                description="Control how customers see and interact with your digital menu."
              >

                <div className="grid gap-5 sm:grid-cols-2">

                  <Field label="Currency">
                    <div className="relative">

                      <CircleDollarSign
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a5968b]"
                      />

                      <select
                        value={
                          settings.menu
                            .currency
                        }
                        onChange={(event) =>
                          updateSectionField(
                            "menu",
                            "currency",
                            event.target
                              .value
                          )
                        }
                        className={`${inputClass} pl-11`}
                      >
                        <option value="ETB">
                          Ethiopian Birr (ETB)
                        </option>

                        <option value="USD">
                          US Dollar (USD)
                        </option>

                        <option value="EUR">
                          Euro (EUR)
                        </option>
                      </select>

                    </div>
                  </Field>

                  <Field
                    label="Default Language"
                  >
                    <div className="relative">

                      <Languages
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a5968b]"
                      />

                      <select
                        value={
                          settings.menu
                            .defaultLanguage
                        }
                        onChange={(event) =>
                          updateSectionField(
                            "menu",
                            "defaultLanguage",
                            event.target
                              .value
                          )
                        }
                        className={`${inputClass} pl-11`}
                      >
                        <option value="en">
                          English
                        </option>

                        <option value="am">
                          አማርኛ
                        </option>

                        <option value="om">
                          Afaan Oromoo
                        </option>
                      </select>

                    </div>
                  </Field>

                </div>

                <div className="mt-7">

                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#a27a60]">
                    Display Options
                  </p>

                  <div className="overflow-hidden rounded-2xl border border-[#eadfd6]">

                    <ToggleRow
                      icon={CircleDollarSign}
                      title="Show Prices"
                      description="Display item prices on the customer menu."
                      enabled={
                        settings.menu
                          .showPrices
                      }
                      onChange={(value) =>
                        updateSectionField(
                          "menu",
                          "showPrices",
                          value
                        )
                      }
                    />

                    <ToggleRow
                      icon={ImageIcon}
                      title="Show Images"
                      description="Display food and drink images."
                      enabled={
                        settings.menu
                          .showImages
                      }
                      onChange={(value) =>
                        updateSectionField(
                          "menu",
                          "showImages",
                          value
                        )
                      }
                    />

                    <ToggleRow
                      icon={Eye}
                      title="Show Descriptions"
                      description="Display item descriptions below names."
                      enabled={
                        settings.menu
                          .showDescriptions
                      }
                      onChange={(value) =>
                        updateSectionField(
                          "menu",
                          "showDescriptions",
                          value
                        )
                      }
                    />

                    <ToggleRow
                      icon={ImageIcon}
                      title="Show Ingredients"
                      description="Allow customers to view ingredients."
                      enabled={
                        settings.menu
                          .showIngredients
                      }
                      onChange={(value) =>
                        updateSectionField(
                          "menu",
                          "showIngredients",
                          value
                        )
                      }
                    />

                    <ToggleRow
                      icon={SearchIcon}
                      title="Enable Search"
                      description="Allow customers to search the menu."
                      enabled={
                        settings.menu
                          .allowSearch
                      }
                      onChange={(value) =>
                        updateSectionField(
                          "menu",
                          "allowSearch",
                          value
                        )
                      }
                    />

                    <ToggleRow
                      icon={Globe2}
                      title="Category Filter"
                      description="Allow customers to filter menu categories."
                      enabled={
                        settings.menu
                          .allowCategoryFilter
                      }
                      onChange={(value) =>
                        updateSectionField(
                          "menu",
                          "allowCategoryFilter",
                          value
                        )
                      }
                      last
                    />

                  </div>

                </div>

              </SettingsCard>
            )}

            {/* =================================================
                LANGUAGES
            ================================================= */}

            {activeSection ===
              "languages" && (
              <SettingsCard
                icon={Languages}
                number="03"
                title="Languages"
                description="Choose which languages are available to your customers."
              >

                <div className="rounded-2xl bg-[#faf7f2] p-5">

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#efe3da] text-[#8b4f2f]">
                      <Globe2 size={20} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#3a2418]">
                        Multilingual Menu
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#81736a]">
                        Customers can switch between
                        enabled languages without
                        reloading the menu.
                      </p>
                    </div>

                  </div>

                </div>

                <div className="mt-5 space-y-3">

                  <LanguageRow
                    code="EN"
                    title="English"
                    description="English menu content"
                    enabled={
                      settings.languages
                        .english
                    }
                    onChange={(value) =>
                      updateSectionField(
                        "languages",
                        "english",
                        value
                      )
                    }
                  />

                  <LanguageRow
                    code="አማ"
                    title="አማርኛ"
                    description="Amharic menu content"
                    enabled={
                      settings.languages
                        .amharic
                    }
                    onChange={(value) =>
                      updateSectionField(
                        "languages",
                        "amharic",
                        value
                      )
                    }
                  />

                  <LanguageRow
                    code="OM"
                    title="Afaan Oromoo"
                    description="Afaan Oromoo menu content"
                    enabled={
                      settings.languages
                        .oromo
                    }
                    onChange={(value) =>
                      updateSectionField(
                        "languages",
                        "oromo",
                        value
                      )
                    }
                  />

                </div>

                <div className="mt-5 rounded-2xl border border-[#eadfd6] bg-white p-4">

                  <p className="text-xs font-semibold text-[#69584e]">
                    Active languages
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#3a2418]">
                    {enabledLanguages}
                    <span className="ml-1 text-sm font-medium text-[#9b887b]">
                      / 3
                    </span>
                  </p>

                </div>

              </SettingsCard>
            )}

            {/* =================================================
                NOTIFICATIONS
            ================================================= */}

            {activeSection ===
              "notifications" && (
              <SettingsCard
                icon={Bell}
                number="04"
                title="Notifications"
                description="Choose which administrative events you want to be notified about."
              >

                <div className="overflow-hidden rounded-2xl border border-[#eadfd6]">

                  <ToggleRow
                    icon={Store}
                    title="New Menu Items"
                    description="Notify when menu items are created or updated."
                    enabled={
                      settings
                        .notifications
                        .newMenuItem
                    }
                    onChange={(value) =>
                      updateSectionField(
                        "notifications",
                        "newMenuItem",
                        value
                      )
                    }
                  />

                  <ToggleRow
                    icon={AlertCircle}
                    title="Availability Alerts"
                    description="Notify when menu items become unavailable."
                    enabled={
                      settings
                        .notifications
                        .lowAvailability
                    }
                    onChange={(value) =>
                      updateSectionField(
                        "notifications",
                        "lowAvailability",
                        value
                      )
                    }
                  />

                  <ToggleRow
                    icon={Smartphone}
                    title="System Updates"
                    description="Receive important system and application updates."
                    enabled={
                      settings
                        .notifications
                        .systemUpdates
                    }
                    onChange={(value) =>
                      updateSectionField(
                        "notifications",
                        "systemUpdates",
                        value
                      )
                    }
                    last
                  />

                </div>

              </SettingsCard>
            )}

            {/* =================================================
                APPEARANCE
            ================================================= */}

            {activeSection ===
              "appearance" && (
              <SettingsCard
                icon={Palette}
                number="05"
                title="Appearance"
                description="Customize the visual identity of your cafe menu."
              >

                <Field label="Menu Theme">

                  <div className="grid gap-3 sm:grid-cols-3">

                    <ThemeOption
                      value="warm"
                      current={
                        settings
                          .appearance
                          .theme
                      }
                      title="Warm Cafe"
                      description="Classic coffee tones"
                      onClick={(value) =>
                        updateSectionField(
                          "appearance",
                          "theme",
                          value
                        )
                      }
                    />

                    <ThemeOption
                      value="minimal"
                      current={
                        settings
                          .appearance
                          .theme
                      }
                      title="Minimal"
                      description="Clean and simple"
                      onClick={(value) =>
                        updateSectionField(
                          "appearance",
                          "theme",
                          value
                        )
                      }
                    />

                    <ThemeOption
                      value="elegant"
                      current={
                        settings
                          .appearance
                          .theme
                      }
                      title="Elegant"
                      description="Premium cafe style"
                      onClick={(value) =>
                        updateSectionField(
                          "appearance",
                          "theme",
                          value
                        )
                      }
                    />

                  </div>

                </Field>

                <div className="mt-7">

                  <Field label="Accent Color">

                    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-[#eadfd6] bg-[#faf7f2] p-4">

                      <input
                        type="color"
                        value={
                          settings
                            .appearance
                            .accentColor
                        }
                        onChange={(event) =>
                          updateSectionField(
                            "appearance",
                            "accentColor",
                            event.target
                              .value
                          )
                        }
                        className="h-12 w-12 cursor-pointer rounded-xl border-0 bg-transparent p-0"
                      />

                      <div>

                        <p className="text-sm font-semibold text-[#3a2418]">
                          Brand Accent
                        </p>

                        <p className="mt-1 text-xs text-[#81736a]">
                          Choose the primary color
                          used throughout the menu.
                        </p>

                      </div>

                      <span className="rounded-lg bg-white px-3 py-2 font-mono text-xs text-[#69584e]">
                        {
                          settings
                            .appearance
                            .accentColor
                        }
                      </span>

                    </div>

                  </Field>

                </div>

                <div className="mt-6 rounded-2xl bg-[#3a2418] p-5 text-white">

                  <p className="text-sm font-semibold">
                    Preview
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/60">
                    Your selected appearance will
                    be applied to the customer menu.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">

                    <span
                      style={{
                        backgroundColor:
                          settings
                            .appearance
                            .accentColor,
                      }}
                      className="rounded-xl px-4 py-2 text-xs font-semibold text-white"
                    >
                      Primary Button
                    </span>

                    <span className="rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white">
                      Secondary
                    </span>

                  </div>

                </div>

              </SettingsCard>
            )}

            {/* =================================================
                SECURITY
            ================================================= */}

            {activeSection ===
              "security" && (
              <div className="space-y-6">

                <SettingsCard
                  icon={ShieldCheck}
                  number="06"
                  title="Security"
                  description="Keep your administrator account protected."
                >

                  <div className="overflow-hidden rounded-2xl border border-[#eadfd6]">

                    <ToggleRow
                      icon={ShieldCheck}
                      title="Two-Factor Authentication"
                      description="Add an extra verification step when signing in."
                      enabled={
                        settings
                          .security
                          .twoFactor
                      }
                      onChange={(value) =>
                        updateSectionField(
                          "security",
                          "twoFactor",
                          value
                        )
                      }
                      last
                    />

                  </div>

                </SettingsCard>

                {/* PASSWORD */}

                <SettingsCard
                  icon={Lock}
                  title="Change Password"
                  description="Update the password used to access the admin dashboard."
                >

                  <form
                    onSubmit={
                      handlePasswordChange
                    }
                    className="space-y-5"
                  >

                    <Field label="Current Password">

                      <PasswordInput
                        value={
                          passwordForm.currentPassword
                        }
                        onChange={(value) =>
                          updatePasswordField(
                            "currentPassword",
                            value
                          )
                        }
                        placeholder="Enter current password"
                        show={showPassword}
                        onToggle={() =>
                          setShowPassword(
                            (value) =>
                              !value
                          )
                        }
                      />

                    </Field>

                    <Field label="New Password">

                      <PasswordInput
                        value={
                          passwordForm.newPassword
                        }
                        onChange={(value) =>
                          updatePasswordField(
                            "newPassword",
                            value
                          )
                        }
                        placeholder="Enter new password"
                        show={showPassword}
                        onToggle={() =>
                          setShowPassword(
                            (value) =>
                              !value
                          )
                        }
                      />

                    </Field>

                    <Field label="Confirm New Password">

                      <PasswordInput
                        value={
                          passwordForm.confirmPassword
                        }
                        onChange={(value) =>
                          updatePasswordField(
                            "confirmPassword",
                            value
                          )
                        }
                        placeholder="Confirm new password"
                        show={showPassword}
                        onToggle={() =>
                          setShowPassword(
                            (value) =>
                              !value
                          )
                        }
                      />

                    </Field>

                    <button
                      type="submit"
                      className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#8b4f2f] px-5 text-sm font-semibold text-white transition hover:bg-[#754126]"
                    >
                      <Lock size={16} />
                      Update Password
                    </button>

                  </form>

                </SettingsCard>

              </div>
            )}

          </main>

        </div>

        {/* =================================================
            MOBILE SAVE BAR
        ================================================= */}

        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#eadfd6] bg-white/95 p-3 shadow-[0_-10px_30px_rgba(58,36,24,0.08)] backdrop-blur sm:hidden">

          <div className="flex gap-2">

            <button
              type="button"
              onClick={handleReset}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#dfd2c8] text-[#69584e]"
              title="Reset"
            >
              <RefreshCw size={17} />
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#8b4f2f] text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? (
                <>
                  <RefreshCw
                    size={17}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Changes
                </>
              )}
            </button>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
}

/* =========================================================
   SETTINGS CARD
========================================================= */

function SettingsCard({
  icon: Icon,
  number,
  title,
  description,
  children,
}) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-[#eadfd6] bg-white shadow-[0_8px_30px_rgba(58,36,24,0.045)]">

      <div className="border-b border-[#eee6df] p-5 sm:p-7">

        <div className="flex items-start gap-4">

          {number && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8b4f2f] text-xs font-bold text-white">
              {number}
            </div>
          )}

          {!number && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f4ebe4] text-[#8b4f2f]">
              <Icon size={19} />
            </div>
          )}

          <div className="min-w-0">

            <h2 className="font-serif text-xl font-semibold text-[#3a2418] sm:text-2xl">
              {title}
            </h2>

            <p className="mt-1 text-xs leading-5 text-[#81736a] sm:text-sm">
              {description}
            </p>

          </div>

        </div>

      </div>

      <div className="p-5 sm:p-7">
        {children}
      </div>

    </section>
  );
}

/* =========================================================
   SETTINGS NAV ITEM
========================================================= */

function SettingsNavItem({
  active,
  onClick,
  icon: Icon,
  title,
  description,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mb-1 flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
        active
          ? "bg-[#f4ebe4] text-[#8b4f2f]"
          : "text-[#69584e] hover:bg-[#faf7f2]"
      }`}
    >

      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          active
            ? "bg-[#8b4f2f] text-white"
            : "bg-[#f7f1ec] text-[#9b887b]"
        }`}
      >
        <Icon size={17} />
      </div>

      <div className="min-w-0">

        <p className="truncate text-sm font-semibold">
          {title}
        </p>

        <p className="mt-0.5 truncate text-[10px] text-[#9b887b]">
          {description}
        </p>

      </div>

    </button>
  );
}

/* =========================================================
   MOBILE NAV
========================================================= */

function SectionNavButton({
  active,
  onClick,
  icon: Icon,
  label,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition ${
        active
          ? "bg-[#8b4f2f] text-white shadow-md shadow-[#8b4f2f]/15"
          : "border border-[#eadfd6] bg-white text-[#69584e]"
      }`}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}

/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  required = false,
  children,
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-xs font-semibold text-[#69584e]">
        {label}

        {required && (
          <span className="ml-1 text-[#a14e43]">
            *
          </span>
        )}
      </span>

      {children}

    </label>
  );
}

/* =========================================================
   INPUT
========================================================= */

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  icon: Icon,
}) {
  return (
    <div className="relative">

      {Icon && (
        <Icon
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a5968b]"
        />
      )}

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className={`${inputClass} ${
          Icon ? "pl-11" : ""
        }`}
      />

    </div>
  );
}

/* =========================================================
   PASSWORD INPUT
========================================================= */

function PasswordInput({
  value,
  onChange,
  placeholder,
  show,
  onToggle,
}) {
  return (
    <div className="relative">

      <Lock
        size={17}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a5968b]"
      />

      <input
        type={
          show
            ? "text"
            : "password"
        }
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className={`${inputClass} pl-11 pr-12`}
      />

      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#9b887b] hover:bg-[#f4ebe4]"
      >
        {show ? (
          <EyeOff size={17} />
        ) : (
          <Eye size={17} />
        )}
      </button>

    </div>
  );
}

/* =========================================================
   TOGGLE ROW
========================================================= */

function ToggleRow({
  icon: Icon,
  title,
  description,
  enabled,
  onChange,
  last = false,
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 p-4 sm:p-5 ${
        !last
          ? "border-b border-[#eee6df]"
          : ""
      }`}
    >

      <div className="flex min-w-0 items-center gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f7f1ec] text-[#8b4f2f]">
          <Icon size={17} />
        </div>

        <div className="min-w-0">

          <p className="text-sm font-semibold text-[#3a2418]">
            {title}
          </p>

          <p className="mt-0.5 text-xs leading-5 text-[#81736a]">
            {description}
          </p>

        </div>

      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() =>
          onChange(!enabled)
        }
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          enabled
            ? "bg-[#8b4f2f]"
            : "bg-[#d9ccc2]"
        }`}
      >

        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
            enabled
              ? "left-6"
              : "left-1"
          }`}
        />

      </button>

    </div>
  );
}

/* =========================================================
   LANGUAGE ROW
========================================================= */

function LanguageRow({
  code,
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#eadfd6] bg-white p-4">

      <div className="flex min-w-0 items-center gap-3">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f4ebe4] text-sm font-bold text-[#8b4f2f]">
          {code}
        </div>

        <div className="min-w-0">

          <p className="text-sm font-semibold text-[#3a2418]">
            {title}
          </p>

          <p className="mt-0.5 text-xs text-[#81736a]">
            {description}
          </p>

        </div>

      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() =>
          onChange(!enabled)
        }
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          enabled
            ? "bg-[#8b4f2f]"
            : "bg-[#d9ccc2]"
        }`}
      >

        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
            enabled
              ? "left-6"
              : "left-1"
          }`}
        />

      </button>

    </div>
  );
}

/* =========================================================
   THEME OPTION
========================================================= */

function ThemeOption({
  value,
  current,
  title,
  description,
  onClick,
}) {
  const active =
    value === current;

  return (
    <button
      type="button"
      onClick={() =>
        onClick(value)
      }
      className={`rounded-2xl border p-4 text-left transition ${
        active
          ? "border-[#8b4f2f] bg-[#f8f0ea] ring-2 ring-[#8b4f2f]/10"
          : "border-[#eadfd6] bg-white hover:bg-[#faf7f2]"
      }`}
    >

      <div className="flex items-center justify-between">

        <div
          className={`h-8 w-8 rounded-lg ${
            value === "warm"
              ? "bg-[#8b4f2f]"
              : value === "minimal"
              ? "bg-[#81736a]"
              : "bg-[#3a2418]"
          }`}
        />

        {active && (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8b4f2f] text-white">
            <Check size={13} />
          </div>
        )}

      </div>

      <p className="mt-4 text-sm font-semibold text-[#3a2418]">
        {title}
      </p>

      <p className="mt-1 text-[11px] leading-4 text-[#81736a]">
        {description}
      </p>

    </button>
  );
}

/* =========================================================
   SEARCH ICON
========================================================= */

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="11"
        cy="11"
        r="8"
      />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

/* =========================================================
   STYLES
========================================================= */

const inputClass =
  "h-12 w-full rounded-2xl border border-[#e4d9d0] bg-white px-4 text-sm text-[#3a2418] outline-none transition placeholder:text-[#aa9b90] focus:border-[#8b4f2f] focus:ring-2 focus:ring-[#8b4f2f]/10";

const textareaClass =
  "w-full resize-none rounded-2xl border border-[#e4d9d0] bg-white px-4 py-3.5 text-sm text-[#3a2418] outline-none transition placeholder:text-[#aa9b90] focus:border-[#8b4f2f] focus:ring-2 focus:ring-[#8b4f2f]/10";

export default AdminSettings;