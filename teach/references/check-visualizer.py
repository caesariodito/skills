"""Check installed skill/command wiring: python3 check-visualizer.py."""
from pathlib import Path

home = Path.home()
skills = home / ".agents/skills"
shared = skills / "teach/references/visualizer.md"
assert shared.is_file()
assert (home / "Applications/Visualizer.app/Contents/MacOS/Visualizer").is_file()
for name in ("teach", "visual-plan", "implementation-plan"):
    skill = skills / name / "SKILL.md"
    text = skill.read_text()
    assert f"name: {name}\n" in text
    assert "visualizer.md" in text and "Visualizer" in text
    prompt = (home / ".pi/agent/prompts" / f"{name}.md").read_text()
    assert f"~/.agents/skills/{name}/SKILL.md" in prompt
    assert "$ARGUMENTS" in prompt
    for link in ("references/visualizer.md", "../teach/references/visualizer.md"):
        if f"]({link})" in text:
            assert (skill.parent / link).resolve() == shared.resolve()
assert "hc run" not in (skills / "teach/SKILL.md").read_text()
delivery = shared.read_text()
assert "open -a" in delivery
assert "## Diagram colors by default" in delivery
assert "classDef input fill:#dbeafe,stroke:#2563eb,color:#172554" in delivery
assert "without color" in delivery and "sequence diagrams" in delivery
assert 'subgraph legend ["Legend"]' in delivery
assert "class legend_input input" in delivery
assert "Legend: blue = input/caller" in delivery
print("Three skills, command aliases, shared color instructions and installed app verified.")
