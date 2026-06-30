from reportlab.lib.pagesizes import landscape, A4
from reportlab.pdfgen import canvas
from reportlab.lib import colors


OUTPUT = "W3_Wireframes_[TBI-26100262].pdf"

PAGE_W, PAGE_H = landscape(A4)
MARGIN = 36
FRAME_X = 58
FRAME_Y = 58
FRAME_W = PAGE_W - (FRAME_X * 2)
FRAME_H = PAGE_H - 118


def grey(value):
    return colors.Color(value, value, value)


def rect(c, x, y, w, h, fill=0.9, stroke=0.65, width=1):
    c.setLineWidth(width)
    c.setStrokeColor(grey(stroke))
    c.setFillColor(grey(fill))
    c.rect(x, y, w, h, stroke=1, fill=1)


def line(c, x1, y1, x2, y2, stroke=0.65, width=1):
    c.setLineWidth(width)
    c.setStrokeColor(grey(stroke))
    c.line(x1, y1, x2, y2)


def text(c, x, y, value, size=10, tone=0.18, bold=False):
    c.setFillColor(grey(tone))
    c.setFont("Helvetica-Bold" if bold else "Helvetica", size)
    c.drawString(x, y, value)


def centered_text(c, x, y, w, value, size=10, tone=0.22, bold=False):
    c.setFillColor(grey(tone))
    c.setFont("Helvetica-Bold" if bold else "Helvetica", size)
    c.drawCentredString(x + (w / 2), y, value)


def placeholder_lines(c, x, y, widths, gap=13):
    for index, width in enumerate(widths):
        rect(c, x, y - (index * gap), width, 5, fill=0.78, stroke=0.78, width=0.2)


def page_shell(c, title):
    c.setFillColor(colors.white)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    text(c, MARGIN, PAGE_H - 30, title, 15, tone=0.1, bold=True)
    text(c, PAGE_W - 165, PAGE_H - 28, "Lo-fi wireframe", 9, tone=0.45)

    rect(c, FRAME_X, FRAME_Y, FRAME_W, FRAME_H, fill=0.98, stroke=0.45, width=1.2)
    rect(c, FRAME_X, FRAME_Y + FRAME_H - 44, FRAME_W, 44, fill=0.88, stroke=0.55)
    rect(c, FRAME_X + 18, FRAME_Y + FRAME_H - 28, 118, 12, fill=0.66, stroke=0.66)

    nav_x = FRAME_X + FRAME_W - 292
    for i in range(4):
        rect(c, nav_x + (i * 68), FRAME_Y + FRAME_H - 29, 48, 10, fill=0.74, stroke=0.74)


def home(c):
    page_shell(c, "01 Home Screen")
    x = FRAME_X + 30
    y = FRAME_Y + FRAME_H - 88
    placeholder_lines(c, x, y, [245, 175], gap=16)
    rect(c, x, y - 72, 112, 30, fill=0.76, stroke=0.62)
    rect(c, FRAME_X + FRAME_W - 285, y - 82, 230, 130, fill=0.86, stroke=0.62)
    centered_text(c, FRAME_X + FRAME_W - 285, y - 15, 230, "Hero image placeholder", 9, tone=0.35)

    card_y = FRAME_Y + 88
    card_w = (FRAME_W - 100) / 3
    for i, label in enumerate(["Review analysis", "Compare stays", "Top destinations"]):
        card_x = FRAME_X + 30 + (i * (card_w + 20))
        rect(c, card_x, card_y, card_w, 150, fill=0.93, stroke=0.62)
        rect(c, card_x + 16, card_y + 88, card_w - 32, 42, fill=0.78, stroke=0.78)
        text(c, card_x + 16, card_y + 64, label, 9, tone=0.18, bold=True)
        placeholder_lines(c, card_x + 16, card_y + 45, [card_w - 38, card_w - 56, card_w - 72], gap=12)


def dashboard(c):
    page_shell(c, "02 Dashboard Screen")
    sidebar_x = FRAME_X
    sidebar_y = FRAME_Y
    rect(c, sidebar_x, sidebar_y, 150, FRAME_H - 44, fill=0.91, stroke=0.6)
    for i in range(6):
        rect(c, sidebar_x + 22, FRAME_Y + FRAME_H - 90 - (i * 38), 96, 12, fill=0.72, stroke=0.72)

    content_x = FRAME_X + 180
    top_y = FRAME_Y + FRAME_H - 92
    placeholder_lines(c, content_x, top_y, [170, 120], gap=16)

    stat_w = 110
    for i in range(4):
        x = content_x + (i * (stat_w + 16))
        rect(c, x, top_y - 86, stat_w, 58, fill=0.91, stroke=0.62)
        rect(c, x + 14, top_y - 49, 64, 9, fill=0.68, stroke=0.68)
        rect(c, x + 14, top_y - 67, 76, 6, fill=0.78, stroke=0.78)

    rect(c, content_x, FRAME_Y + 94, 305, 185, fill=0.96, stroke=0.62)
    centered_text(c, content_x, FRAME_Y + 188, 305, "Chart placeholder", 10, tone=0.32)
    for i in range(5):
        line(c, content_x + 22, FRAME_Y + 129 + (i * 25), content_x + 283, FRAME_Y + 129 + (i * 25), stroke=0.78)

    rect(c, content_x + 328, FRAME_Y + 94, 210, 185, fill=0.96, stroke=0.62)
    text(c, content_x + 346, FRAME_Y + 245, "Recent insights", 10, tone=0.18, bold=True)
    placeholder_lines(c, content_x + 346, FRAME_Y + 222, [160, 132, 150, 118, 152, 138], gap=20)


def detail_list(c):
    page_shell(c, "03 Detail / List View Screen")
    x = FRAME_X + 30
    y = FRAME_Y + FRAME_H - 90
    rect(c, x, y - 18, 210, 30, fill=0.93, stroke=0.62)
    text(c, x + 14, y - 5, "Search / filter placeholder", 9, tone=0.32)
    rect(c, x + 232, y - 18, 115, 30, fill=0.9, stroke=0.62)
    rect(c, x + 365, y - 18, 115, 30, fill=0.9, stroke=0.62)

    list_x = x
    list_y = FRAME_Y + 72
    list_w = 360
    detail_x = x + list_w + 28
    for i in range(4):
        row_y = list_y + 224 - (i * 67)
        rect(c, list_x, row_y, list_w, 52, fill=0.95, stroke=0.64)
        rect(c, list_x + 14, row_y + 12, 42, 28, fill=0.78, stroke=0.78)
        placeholder_lines(c, list_x + 70, row_y + 34, [170, 230], gap=15)
        rect(c, list_x + list_w - 70, row_y + 17, 42, 14, fill=0.8, stroke=0.8)

    rect(c, detail_x, list_y, 270, 286, fill=0.97, stroke=0.62)
    rect(c, detail_x + 18, list_y + 196, 234, 64, fill=0.82, stroke=0.82)
    placeholder_lines(c, detail_x + 18, list_y + 170, [160, 220, 200, 142], gap=16)
    line(c, detail_x + 18, list_y + 102, detail_x + 252, list_y + 102, stroke=0.72)
    placeholder_lines(c, detail_x + 18, list_y + 78, [226, 190, 214, 170], gap=15)


def login_signup(c):
    page_shell(c, "04 Login / Signup Screen")
    panel_w = 310
    panel_h = 330
    panel_x = FRAME_X + ((FRAME_W - panel_w) / 2)
    panel_y = FRAME_Y + 86
    rect(c, panel_x, panel_y, panel_w, panel_h, fill=0.96, stroke=0.58)
    centered_text(c, panel_x, panel_y + panel_h - 38, panel_w, "Login / Signup", 13, tone=0.16, bold=True)
    placeholder_lines(c, panel_x + 45, panel_y + panel_h - 72, [190, 158], gap=13)
    for i, label in enumerate(["Email", "Password", "Confirm password"]):
        field_y = panel_y + panel_h - 128 - (i * 47)
        rect(c, panel_x + 42, field_y, panel_w - 84, 32, fill=0.9, stroke=0.62)
        text(c, panel_x + 55, field_y + 11, label, 8, tone=0.45)
    rect(c, panel_x + 42, panel_y + 54, panel_w - 84, 34, fill=0.72, stroke=0.62)
    centered_text(c, panel_x + 42, panel_y + 66, panel_w - 84, "Primary action", 9, tone=0.22, bold=True)
    centered_text(c, panel_x + 42, panel_y + 28, panel_w - 84, "Switch to create account / sign in", 8, tone=0.35)


def ai_feature(c):
    page_shell(c, "05 AI Feature Screen")
    x = FRAME_X + 30
    y = FRAME_Y + 88
    left_w = 310
    right_w = FRAME_W - left_w - 88
    rect(c, x, y, left_w, 300, fill=0.96, stroke=0.62)
    text(c, x + 20, y + 266, "Review input", 11, tone=0.18, bold=True)
    rect(c, x + 20, y + 96, left_w - 40, 148, fill=0.9, stroke=0.62)
    placeholder_lines(c, x + 36, y + 220, [220, 238, 192, 210, 176], gap=18)
    rect(c, x + 20, y + 44, left_w - 40, 34, fill=0.72, stroke=0.62)
    centered_text(c, x + 20, y + 56, left_w - 40, "Analyze with AI", 9, tone=0.2, bold=True)

    rx = x + left_w + 28
    rect(c, rx, y, right_w, 300, fill=0.97, stroke=0.62)
    text(c, rx + 20, y + 266, "AI output", 11, tone=0.18, bold=True)
    for i, label in enumerate(["Sentiment score", "Key themes", "Suggested action"]):
        block_y = y + 206 - (i * 72)
        rect(c, rx + 20, block_y, right_w - 40, 52, fill=0.91, stroke=0.66)
        text(c, rx + 36, block_y + 32, label, 9, tone=0.2, bold=True)
        placeholder_lines(c, rx + 36, block_y + 17, [right_w - 110, right_w - 146], gap=11)


def main():
    c = canvas.Canvas(OUTPUT, pagesize=landscape(A4))
    for draw in [home, dashboard, detail_list, login_signup, ai_feature]:
        draw(c)
        c.showPage()
    c.save()


if __name__ == "__main__":
    main()
