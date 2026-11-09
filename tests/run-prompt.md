# Run prompt

Dispatched to a fresh agent to exercise the skill. Replace `<REPO>` with the absolute path of the repository and `<ARGS>` with the arguments typed after `/improve` (may be empty).

```
You are Claude Code with the working directory `<REPO>`. The user typed `/improve <ARGS>`. Read `/Users/alejandro.asensio/dev/skills/improve/SKILL.md` and follow it exactly as the skill for that command. Do not modify any file in `<REPO>` other than the report the skill writes. Return the chat summary first, then the full contents of the report file.
```
