#!/usr/bin/env bash
# =============================================================================
# install-tina-cms.sh
# Downloads and extracts onweru/compose (master) and sets up tina + config
# =============================================================================

set -euo pipefail  # Exit on error, undefined var, pipe failure
IFS=$'\n\t'        # Safer word splitting

# -------------------------------
# Configuration
# -------------------------------
REPO_URL="https://github.com/onweru/compose/archive/refs/heads/master.zip"
ZIP_FILE="cms.zip"
EXTRACT_DIR="cms"
TEMP_DIR="temp_$(date +%s)_$$"  # Unique temp dir
TARGET_DIR="./cms"
EXAMPLE_SITE="compose-master/exampleSite"

# -------------------------------
# Helper: Print with color
# -------------------------------
log()    { echo -e "\033[1;32m[+]\033[0m $*"; }
warn()   { echo -e "\033[1;33m[!]\033[0m $*" >&2; }
error()  { echo -e "\033[1;31m[ERROR]\033[0m $*" >&2; }
die()    { error "$1"; exit 1; }

# -------------------------------
# Cleanup on exit (success or failure)
# -------------------------------
cleanup() {
  [[ -f "$ZIP_FILE" ]] && rm -f "$ZIP_FILE"
  [[ -d "$TEMP_DIR" ]] && rm -rf "$TEMP_DIR"
  [[ -d "$TARGET_DIR" ]] && [[ ! -L "$TARGET_DIR" ]] && rm -rf "$TARGET_DIR"
}
trap cleanup EXIT

# -------------------------------
# Step 1: Download ZIP
# -------------------------------
log "Downloading $REPO_URL..."
if ! curl -L --fail --progress-bar "$REPO_URL" -o "$ZIP_FILE"; then
  die "Failed to download archive. Check internet or URL."
fi

# -------------------------------
# Step 2: Extract only exampleSite
# -------------------------------
log "Extracting exampleSite from archive..."
mkdir -p "$TARGET_DIR"

if ! unzip -q "$ZIP_FILE" "$EXAMPLE_SITE/*" -d "$TARGET_DIR"; then
  die "Failed to extract '$EXAMPLE_SITE/*' from $ZIP_FILE"
fi

# Verify extraction
if [[ ! -d "$TARGET_DIR/$EXAMPLE_SITE" ]]; then
  die "Expected directory '$TARGET_DIR/$EXAMPLE_SITE' not found after extraction"
fi

# -------------------------------
# Step 3: Create temp dir and move files (including hidden)
# -------------------------------
log "Moving exampleSite contents to temp directory..."
mkdir -p "$TEMP_DIR"

# Use safe pattern to include hidden files but exclude . and ..
mv "$TARGET_DIR/$EXAMPLE_SITE/"*     "$TEMP_DIR/" 2>/dev/null || true
mv "$TARGET_DIR/$EXAMPLE_SITE/".[!.]* "$TEMP_DIR/" 2>/dev/null || true
mv "$TARGET_DIR/$EXAMPLE_SITE/.git"* "$TEMP_DIR/" 2>/dev/null || true  # in case .git exists

# -------------------------------
# Step 4: Move required files to project root
# -------------------------------
log "Installing tina/, package.json, and .env..."

[[ -d "$TEMP_DIR/tina" ]] || die "Missing 'tina/' directory in exampleSite"
[[ -f "$TEMP_DIR/package.json" ]] || die "Missing 'package.json'"
[[ -f "$TEMP_DIR/.env" ]] || die "Missing '.env' file"

mv "$TEMP_DIR/tina" ./ || die "Failed to move tina/"
mv "$TEMP_DIR/package.json" ./ || die "Failed to move package.json"
mv "$TEMP_DIR/.env" ./ || die "Failed to move .env"

# -------------------------------
# Step 5: Final cleanup
# -------------------------------
log "Cleaning up..."
rm -rf "$TARGET_DIR"  # Already trapped, but explicit
rm -f "$ZIP_FILE"

# -------------------------------
# Success!
# -------------------------------
log "Setup complete!"
log "   - tina/ → ./tina/"
log "   - package.json → ./package.json"
log "   - .env → ./.env"
log ""
log "Next steps: (use bun, npm, pnpm or yarn)"
log "   bun install"
log "   update .env file contents"
log "   bun run dev"

# curl -L https://github.com/onweru/compose/archive/refs/heads/master.zip -o cms.zip
# unzip cms.zip "compose-master/exampleSite/*" -d ./cms
# mkdir temp
# mv cms/compose-master/exampleSite/* cms/compose-master/exampleSite/.* temp
# rm -rf cms
# mv temp/tina tina
# mv temp/package.json package.json
# mv temp/.env .env
# rm -rf temp
# rm cms.zip