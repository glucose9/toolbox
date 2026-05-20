"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import html2canvas from "html2canvas";

type Sender = "me" | "other";

type Message = {
  id: number;
  sender: Sender;
  text: string;
  time: string;
};

function nowHHMM(am: string, pm: string): string {
  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes();
  const ampm = h < 12 ? am : pm;
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${ampm} ${hour12}:${m.toString().padStart(2, "0")}`;
}

let nextId = 4;

export default function KakaoChatTool() {
  const t = useTranslations("toolUI.kakaotalk-chat");
  const [roomTitle, setRoomTitle] = useState<string>("친구");
  const [otherName, setOtherName] = useState<string>("친구");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "other", text: "오늘 점심 뭐 먹을까?", time: "오전 11:30" },
    { id: 2, sender: "me", text: "김치찌개 어때?", time: "오전 11:31" },
    { id: 3, sender: "other", text: "좋아 12시에 보자!", time: "오전 11:32" },
  ]);
  const [draftSender, setDraftSender] = useState<Sender>("other");
  const [draftText, setDraftText] = useState<string>("");
  const [draftTime, setDraftTime] = useState<string>("");
  const previewRef = useRef<HTMLDivElement>(null);

  const addMessage = () => {
    if (!draftText.trim()) return;
    const m: Message = {
      id: nextId++,
      sender: draftSender,
      text: draftText,
      time: draftTime || nowHHMM(t("am"), t("pm")),
    };
    setMessages((prev) => [...prev, m]);
    setDraftText("");
    setDraftTime("");
  };

  const deleteMessage = (id: number) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const downloadPng = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, {
      backgroundColor: theme === "light" ? "#b2c7d9" : "#1f1f1f",
      scale: 2,
    });
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `kakao-chat-${Date.now()}.png`;
    a.click();
  };

  const lightBg = "#b2c7d9";
  const darkBg = "#1f1f1f";
  const bgColor = theme === "light" ? lightBg : darkBg;
  const headerBg = theme === "light" ? "#a4bbcf" : "#2a2a2a";
  const headerText = theme === "light" ? "#1a1a1a" : "#f3f3f3";
  const otherBubbleBg = theme === "light" ? "#ffffff" : "#2a2a2a";
  const otherBubbleText = theme === "light" ? "#1a1a1a" : "#f3f3f3";
  const meBubbleBg = "#fee500";
  const meBubbleText = "#1a1a1a";
  const nameColor = theme === "light" ? "#1a1a1a" : "#f3f3f3";
  const timeColor = theme === "light" ? "#5b6878" : "#888";

  return (
    <div className="card">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="label">{t("roomTitle")}</label>
            <input
              className="input"
              value={roomTitle}
              onChange={(e) => setRoomTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="label">{t("otherName")}</label>
            <input
              className="input"
              value={otherName}
              onChange={(e) => setOtherName(e.target.value)}
            />
          </div>
          <div>
            <label className="label">{t("theme")}</label>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme("light")}
                className={theme === "light" ? "btn btn-primary" : "btn btn-secondary"}
              >
                {t("light")}
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={theme === "dark" ? "btn btn-primary" : "btn btn-secondary"}
              >
                {t("dark")}
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <label className="label">{t("messages")}</label>
            <div className="space-y-2 max-h-64 overflow-y-auto mb-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className="flex items-start gap-2 text-sm bg-gray-50 dark:bg-gray-800 rounded p-2"
                >
                  <span className="font-medium text-xs px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700">
                    {m.sender === "me" ? t("me") : t("other")}
                  </span>
                  <span className="flex-1 break-words">{m.text}</span>
                  <span className="text-xs text-muted">{m.time}</span>
                  <button
                    onClick={() => deleteMessage(m.id)}
                    className="text-xs text-red-600 hover:underline"
                  >
                    {t("delete")}
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <select
                  className="input"
                  value={draftSender}
                  onChange={(e) => setDraftSender(e.target.value as Sender)}
                >
                  <option value="other">{t("other")}</option>
                  <option value="me">{t("me")}</option>
                </select>
                <input
                  className="input"
                  placeholder={t("time")}
                  value={draftTime}
                  onChange={(e) => setDraftTime(e.target.value)}
                />
              </div>
              <input
                className="input"
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addMessage();
                }}
                placeholder={t("sender")}
              />
              <button onClick={addMessage} className="btn btn-secondary w-full">
                {t("addMessage")}
              </button>
            </div>
          </div>

          <p className="text-xs text-muted">{t("disclaimer")}</p>
        </div>

        <div className="flex flex-col items-center">
          <div
            ref={previewRef}
            style={{
              width: 340,
              backgroundColor: bgColor,
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
            }}
          >
            <div
              style={{
                backgroundColor: headerBg,
                color: headerText,
                padding: "12px 14px",
                fontWeight: 600,
                fontSize: 15,
                textAlign: "center",
              }}
            >
              {roomTitle}
            </div>

            <div style={{ padding: "12px 10px", display: "flex", flexDirection: "column", gap: 10 }}>
              {messages.map((m) =>
                m.sender === "other" ? (
                  <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <div style={{ fontSize: 12, color: nameColor, marginBottom: 4, paddingLeft: 4 }}>
                      {otherName}
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                      <div
                        style={{
                          backgroundColor: otherBubbleBg,
                          color: otherBubbleText,
                          padding: "8px 12px",
                          borderRadius: 14,
                          maxWidth: 230,
                          fontSize: 14,
                          lineHeight: 1.4,
                          wordBreak: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {m.text}
                      </div>
                      <div style={{ fontSize: 10, color: timeColor }}>{m.time}</div>
                    </div>
                  </div>
                ) : (
                  <div key={m.id} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                      <div style={{ fontSize: 10, color: timeColor }}>{m.time}</div>
                      <div
                        style={{
                          backgroundColor: meBubbleBg,
                          color: meBubbleText,
                          padding: "8px 12px",
                          borderRadius: 14,
                          maxWidth: 230,
                          fontSize: 14,
                          lineHeight: 1.4,
                          wordBreak: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {m.text}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <button onClick={downloadPng} className="btn btn-primary mt-4">
            {t("downloadPng")}
          </button>
        </div>
      </div>
    </div>
  );
}
