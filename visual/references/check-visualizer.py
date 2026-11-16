"""Check installed wiring: python3 visual/references/check-visualizer.py."""
from pathlib import Path
import plistlib

home = Path.home()
skills = home / ".agents/skills"
shared = skills / "visual/references/visualizer.md"
assert shared.is_file()
app = home / "Applications/Visualizer.app"
info = plistlib.loads((app / "Contents/Info.plist").read_bytes())
assert info["CFBundleName"] == "Visualizer"
assert (app / "Contents/MacOS" / info["CFBundleExecutable"]).is_file()
for name in ("teach", "visual"):
    skill = skills / name / "SKILL.md"
    text = skill.read_text()
    assert f"name: {name}\n" in text
    assert "visualizer.md" in text and "Visualizer" in text
    prompt = (home / ".pi/agent/prompts" / f"{name}.md").read_text()
    assert f"~/.agents/skills/{name}/SKILL.md" in prompt
    assert "$ARGUMENTS" in prompt
    link = "references/visualizer.md" if name == "visual" else "../visual/references/visualizer.md"
    assert (skill.parent / link).resolve() == shared.resolve()
for name in ("visual-plan", "visual-recap", "implementation-plan"):
    assert not (skills / name / "SKILL.md").exists(), f"Retired skill still discoverable: {name}"
    assert not (home / ".pi/agent/prompts" / f"{name}.md").exists(), f"Retired command: {name}"
delivery = shared.read_text()
for rule in ("open -n -a", "## Diagram colors by default", "without color", 'subgraph legend ["Legend"]', "## Local PNG screenshots and galleries"):
    assert rule in delivery
print("Visual/teach commands, shared renderer rules and installed Visualizer app verified.")
