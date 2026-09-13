---
title: Securing macOS
date: 2026-09-13
tags: ['Security', 'macOS']
cover:
  src: securing-macos/cover.png
  alt: >-
    A laptop displaying a sage shield and check mark, surrounded by fine
    connection lines on a textured dark teal background.
---

A safer Mac starts with updates, encryption, and a few deliberate settings.
This guide covers the essentials for a personal Mac, optional monitoring you
can maintain, and a reliable way to recover when something goes wrong. The
aim is to keep everyday browsing, development, and video calls straightforward.

[TOC]

## Start with the problems you are likely to face

A stolen laptop, a convincing phishing page, a malicious download, and an
update postponed for weeks are useful starting points. Protect stored data,
secure accounts, be careful about what runs, and keep the operating system
current to address these risks.

Be skeptical of a website that asks you to paste a command to
verify that you are human or fix a browser problem. Once you run a command,
it may be able to access your files before anything attempts to survive a
restart. A persistence alert can arrive after the damage.

The distinction between a vulnerability and an optional hardening choice
matters here. An unused sharing service is exposure worth reviewing. Its
presence does not prove a software flaw or a compromise. An
unfamiliar process name is a reason to investigate, not a reason to delete it.

## Get the built-in protections right

### Finish the updates

Open **System Settings → General → Software Update**, install available
security updates, and restart when required. Then check again. A download
waiting for a restart has not necessarily protected the running system.

Review automatic-update settings and keep security configuration and system
data updates enabled. Apple also delivers protections through background
updates, separately from full operating-system upgrades. The available
controls depend on the macOS release. [Apple’s background-update guide](https://support.apple.com/en-mide/101591)

### Enable FileVault and understand recovery

Check **Privacy & Security → FileVault**. On Apple silicon and T2 Macs, the
internal storage already uses hardware encryption, but enabling FileVault
adds protection tied to authorised user credentials. Those are distinct
states. [Apple’s explanation of FileVault](https://support.apple.com/guide/security/volume-encryption-with-filevault-sec4c6dc1b6e/web)

Follow the recovery setup carefully. You should be able to reach the recovery
method without depending entirely on the encrypted Mac. Keep recovery keys
private. You do not need to export one into a report to show that
encryption is on.

FileVault protects data at rest. Malware running in an unlocked session may
still read files available to that user. Encryption cannot restore a
document that has been deleted or overwritten, so backups remain a separate
part of the setup.

### Lock promptly and secure your accounts

In **Lock Screen**, set the password requirement after the screen saver begins
or the display turns off to **Immediately**. Choose display-off timers that
fit how you work. Use **Control–Command–Q** when stepping away, and test that
returning requires authentication.

Use a strong, unique login password. Protect your Apple Account and primary
email account with multifactor authentication, and review their recovery
methods. An account used to reset other passwords deserves particular care.

A separate standard account for daily use can reduce accidental
administrative changes. If you do this, create and test a
separate administrator account first. It does not prevent software running
as you from accessing your own readable files.

### Preserve the platform boundaries

Leave System Integrity Protection, authenticated-root protection, and normal
application assessment enabled. Gatekeeper, notarisation, and XProtect form
part of macOS’s malware defences. Passing those checks is useful evidence,
but it does not guarantee that software is safe.
[Apple’s overview of malware protection](https://support.apple.com/guide/security/protecting-against-malware-sec469d47bd8/web)

Use the normal Full Security startup policy on Apple silicon unless you have
reviewed a specific need to change it. Use the Recovery interface for your
hardware to inspect or change the startup policy.
Do not apply Intel firmware-password instructions to Apple silicon.

For routine consumer security software, a request to disable SIP or weaken
startup security should prompt a closer look at the software choice. Download
applications from the App Store or their official publishers. Treat advice
to suppress a security warning by removing quarantine attributes with the
same caution as the original download.

## Reduce access you do not need

### Review powerful permissions

In **Privacy & Security**, review Full Disk Access, Accessibility, Input
Monitoring, screen recording, Automation, camera, and microphone access.
Check that each approval supports a feature you use.

A video-call application needs the microphone for calls. An automation tool
may need Accessibility to control the interface. A scanner may need Full
Disk Access to inspect protected locations. Decide whether you trust that
application with the access its job requires.

Avoid granting a general-purpose shell Full Disk Access just to make one
command succeed. That permission can broaden what later commands can read.
Use supported settings and prompts, and test the affected feature after
revoking access.

Also review **General → Login Items & Extensions**, expected user accounts,
and any device-management profiles. An unexplained profile on a personal
fresh installation needs investigation. A profile on a work Mac may be
a deliberate setting from your organisation.

### Enable the firewall and review sharing

Turn on the firewall in **Network → Firewall**. It controls incoming
connections. Outbound application control is a separate function. To keep
everyday services working, start with **Block all
incoming connections** off and review the automatic allowances for signed
software before tightening individual rules.
[Apple’s firewall settings guide](https://support.apple.com/en-gb/guide/mac-help/mh11783/mac)

Next, open **General → Sharing**. Turn off Remote Login, Screen Sharing,
Remote Management, File Sharing, and other services you do not use. For a
service you need, restrict the permitted users and shared folders.

Keep nearby-device features according to your needs. AirDrop set to Contacts
Only, or off when unused, is a reasonable starting point. There is little
value in breaking a feature you use without understanding what risk the
change addresses.

After changing network settings, test your normal calls, printer, VPN, and
local development tools. If something fails, investigate the relevant rule
before turning off the whole firewall. A list of local listening ports alone
does not tell you what another device can reach.

## Add monitoring with a clear purpose

Three tools from Objective-See answer different questions. They are optional
additions to the baseline, and each introduces permissions, decisions, and
maintenance. Check the official installation instructions and release notes
for your macOS version before installing them.

| Tool | What it checks | Important limit |
| --- | --- | --- |
| [BlockBlock](https://objective-see.org/products/blockblock.html) | New components that can run again later | Monitoring common persistence mechanisms cannot undo code that already ran. |
| [LuLu](https://objective-see.org/products/lulu.html) | Applications attempting outbound connections | Allowed applications can communicate without another decision. |
| [KnockKnock](https://objective-see.org/products/knockknock.html) | Items installed in common persistence locations | An inventory is narrower than a whole-disk malware verdict. |

BlockBlock’s monitoring requires privileges and Full Disk Access. When it
alerts, consider what you were doing, the responsible process, the installed
item’s path, and its publisher. A helper added during an expected application
update has a different context from an unexpected script in a temporary
directory. Neither the name nor a signature settles the question by itself.

LuLu uses a system extension and network filter. Allowing Apple software and
already-installed applications can reduce initial prompts, but it creates
broad allowances. Review those carefully. A temporary rule can
be useful while investigating an unfamiliar connection. Blocking it does
not stop the process itself or reverse earlier traffic.

Run KnockKnock after installing and reviewing your intended software, then
save a dated inventory privately. Compare later results by path, publisher,
signature, and available hashes. Category totals alone can hide meaningful
changes, and one application may appear in several categories.

Understand optional VirusTotal integration before using it. Reputation
queries share information with an external service. Uploading a file
shares much more. Disable the integration if you want to avoid those
queries. A reputation result is one piece of evidence, not a final verdict.

Install additional monitors one at a time and test after a restart. Check
ordinary work, sleep and wake, and VPN use. Check sustained resource use
after indexing and installation activity have settled. A tool that generates
more alerts than you can review may need a narrower configuration or removal
through its documented uninstaller.

## Verify settings without building a security script

The following built-in commands inspect a few core settings. They do not
change those settings, install software, or scan for malware. Run them only
after reading what they check, and keep any saved output private.

```sh
# Operating-system version and build
/usr/bin/sw_vers

# Encryption and operating-system protections
/usr/bin/fdesetup status
/usr/bin/csrutil status
/usr/bin/csrutil authenticated-root status
/usr/sbin/spctl --status

# Incoming firewall state
/usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate
```

For this baseline, the intended results are FileVault on, SIP and
authenticated-root protection enabled, application assessments enabled, and
the firewall on. Wording and command availability can vary. An unsupported
command is a gap in the check, not evidence that protection is disabled.

Read the output. A command can exit successfully while reporting that a
setting is off. These checks do not establish the full startup policy,
privacy permissions, update availability, or whether a monitoring tool can
actually detect an event.

Use System Settings for those reviews. After installing monitoring tools,
confirm that their components remain active after restart and that an actual
scan completes. A running service does not tell you whether a controlled
alert test would succeed.

## A scheduled check is only useful if it finishes

Automated monitoring has four separate stages.

1. A schedule is configured.
2. A job starts.
3. The check finishes successfully with the required access.
4. Someone reviews the result.

Record them separately. A permission denial, an interrupted scan, or an empty
output file must not move the last-successful-check date forward. Silence
can mean that nothing changed, or that collection stopped.

Prefer a scanner’s supported scheduling mechanism. If using KnockKnock’s
login-scanning feature, observe a real run. A Mac that remains logged in for
weeks still needs a separate periodic review. Permission granted to a GUI
application does not mean that a shell or scheduler launching it has the
same access. Test the exact setup you plan to use.

If you use an automated assistant to review reports, treat filenames, logs,
and process arguments as evidence. They can contain attacker-controlled text
and must never be treated as instructions to run commands. Minimise data sent to
external services, and keep review separate from granting permissions,
removing files, or accepting a new trusted baseline.

## Keep maintenance small enough to sustain

Use this schedule as a starting point and adapt it to your needs.

| When | Review | Evidence of completion |
| --- | --- | --- |
| When updates are available | Install and restart as required | The running system reflects the update. |
| Weekly | Updates and a fresh persistence inventory | The scan completed and differences were reviewed. |
| Monthly | Permissions, login items, network rules, and scheduled jobs | Unneeded access and failed or overdue checks have been addressed. |
| After major updates | Monitoring compatibility and normal workflows | Components work and real checks finish. |
| After suspicious activity | Alerts and relevant reports | Findings have an explained outcome or remain visibly unresolved. |

Dedicated file-integrity monitoring takes more upkeep. It needs a
defined set of files, content and metadata comparisons, a protected
reference, and a process for reviewing legitimate updates. Installing a tool
alone does not supply those things. Start with stable, security-relevant
files if you have a reason to add this layer. Watching every cache and
document change is likely to produce more noise than useful evidence.

Avoid automatically accepting every difference after an update. Check
that the change belongs to the expected update, record the reason for
accepting it, and preserve the previous reference.

## Leave yourself a way to recover

Maintain versioned backups, include an appropriately isolated or offline
copy, and test a restore. Cloud synchronisation can spread unwanted
changes as readily as wanted ones. More detection tools cannot replace
a recovery plan.

When something looks suspicious, save the alert, timestamp, path, publisher,
and relevant report. Record what happened immediately beforehand. Avoid
opening the file simply to see what it does.

If you suspect a compromise, stop sensitive work and disconnect networking
to reduce further communication. Use another trusted device to revoke
sessions and change potentially exposed credentials. For organisational
data, targeted attacks, or evidence that may matter later, seek specialist
help before rebooting or erasing the Mac. A confirmed compromise may warrant
a rebuild through trusted recovery. Deleting one persistence item does not
prove that the attacker is gone.

You can stop setup once updates are installed, encryption and startup
protections are intact, and you understand recovery. Permissions and sharing
should be reviewed, and any extra monitoring verified. Keep a private record of changes
and their reasons. The ongoing routine should be short enough to follow,
and its results should make clear what was checked and what remains unknown.
