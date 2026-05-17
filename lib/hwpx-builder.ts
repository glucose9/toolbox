import JSZip from "jszip";

export type HwpxBuilderOptions = {
  text: string;
  fontName: string;
  fontSizePt: number; // 10, 11, 12, ...
  title?: string;
};

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const VERSION_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<HCFVersion xmlns="http://www.hancom.co.kr/hwpml/2011/version" tagetApplication="WORDPROCESSOR" major="5" minor="0" micro="3" buildNumber="0" os="WINDOWS" application="Hancom Office" appVersion="13.0.0.0"/>`;

const CONTAINER_XML = `<?xml version="1.0" encoding="UTF-8"?>
<ocf:container xmlns:ocf="urn:oasis:names:tc:opendocument:xmlns:container">
  <ocf:rootfiles>
    <ocf:rootfile full-path="Contents/content.hpf" media-type="application/hwpml-package+xml"/>
  </ocf:rootfiles>
</ocf:container>`;

const MANIFEST_XML = `<?xml version="1.0" encoding="UTF-8"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0">
  <manifest:file-entry manifest:full-path="/" manifest:media-type="application/hwpml-package+xml"/>
  <manifest:file-entry manifest:full-path="Contents/header.xml" manifest:media-type="application/xml"/>
  <manifest:file-entry manifest:full-path="Contents/section0.xml" manifest:media-type="application/xml"/>
</manifest:manifest>`;

const CONTENT_HPF = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<opf:package xmlns:opf="http://www.idpf.org/2007/opf/" version="1.0" unique-identifier="hwpx-uid">
  <opf:metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <opf:meta name="generator" content="barokit-hwpx-builder"/>
    <dc:identifier id="hwpx-uid">urn:uuid:barokit-${Date.now()}</dc:identifier>
    <dc:title>HWPX Document</dc:title>
  </opf:metadata>
  <opf:manifest>
    <opf:item id="header" href="header.xml" media-type="application/xml"/>
    <opf:item id="section0" href="section0.xml" media-type="application/xml"/>
  </opf:manifest>
  <opf:spine>
    <opf:itemref idref="section0" linear="yes"/>
  </opf:spine>
</opf:package>`;

function headerXml(fontName: string, fontSizeHundredthsPt: number): string {
  const f = escapeXml(fontName);
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<hh:head xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head" version="1.4" secCnt="1">
  <hh:beginNum page="1" footnote="1" endnote="1" pic="1" tbl="1" equation="1"/>
  <hh:fontfaces itemCnt="7">
    <hh:fontface lang="HANGUL" itemCnt="1"><hh:font id="0" face="${f}" type="TTF" isEmbedded="0"/></hh:fontface>
    <hh:fontface lang="LATIN" itemCnt="1"><hh:font id="0" face="${f}" type="TTF" isEmbedded="0"/></hh:fontface>
    <hh:fontface lang="HANJA" itemCnt="1"><hh:font id="0" face="${f}" type="TTF" isEmbedded="0"/></hh:fontface>
    <hh:fontface lang="JAPANESE" itemCnt="1"><hh:font id="0" face="${f}" type="TTF" isEmbedded="0"/></hh:fontface>
    <hh:fontface lang="OTHER" itemCnt="1"><hh:font id="0" face="${f}" type="TTF" isEmbedded="0"/></hh:fontface>
    <hh:fontface lang="SYMBOL" itemCnt="1"><hh:font id="0" face="${f}" type="TTF" isEmbedded="0"/></hh:fontface>
    <hh:fontface lang="USER" itemCnt="1"><hh:font id="0" face="${f}" type="TTF" isEmbedded="0"/></hh:fontface>
  </hh:fontfaces>
  <hh:borderFills itemCnt="1">
    <hh:borderFill id="1" threeD="0" shadow="0" centerLine="NONE" breakCellSeparateLine="0">
      <hh:slash type="NONE" Crooked="0" isCounter="0"/>
      <hh:backSlash type="NONE" Crooked="0" isCounter="0"/>
      <hh:leftBorder type="SOLID" width="0.1 mm" color="#000000"/>
      <hh:rightBorder type="SOLID" width="0.1 mm" color="#000000"/>
      <hh:topBorder type="SOLID" width="0.1 mm" color="#000000"/>
      <hh:bottomBorder type="SOLID" width="0.1 mm" color="#000000"/>
      <hh:diagonal type="SOLID" width="0.1 mm" color="#000000"/>
    </hh:borderFill>
  </hh:borderFills>
  <hh:charProperties itemCnt="1">
    <hh:charPr id="0" height="${fontSizeHundredthsPt}" textColor="#000000" shadeColor="none" useFontSpace="0" useKerning="0" symMark="NONE" borderFillIDRef="1">
      <hh:fontRef hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/>
      <hh:ratio hangul="100" latin="100" hanja="100" japanese="100" other="100" symbol="100" user="100"/>
      <hh:spacing hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/>
      <hh:relSz hangul="100" latin="100" hanja="100" japanese="100" other="100" symbol="100" user="100"/>
      <hh:offset hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/>
      <hh:underline type="NONE" shape="SOLID" color="#000000"/>
      <hh:strikeout shape="NONE" color="#000000"/>
      <hh:outline type="SOLID"/>
      <hh:shadow type="NONE" color="#B2B2B2" offsetX="10" offsetY="10"/>
    </hh:charPr>
  </hh:charProperties>
  <hh:tabProperties itemCnt="1">
    <hh:tabPr id="0" autoTabLeft="1" autoTabRight="1" itemCnt="0"/>
  </hh:tabProperties>
  <hh:numberings itemCnt="0"/>
  <hh:bullets itemCnt="0"/>
  <hh:paraProperties itemCnt="1">
    <hh:paraPr id="0" tabPrIDRef="0" condense="0" fontLineHeight="0" snapToGrid="1" suppressLineNumbers="0" checked="0">
      <hh:align horizontal="JUSTIFY" vertical="BASELINE"/>
      <hh:heading type="NONE" idRef="0" level="0"/>
      <hh:breakSetting breakLatinWord="KEEP_WORD" breakNonLatinWord="KEEP_WORD" widowOrphan="0" keepWithNext="0" keepLines="0" pageBreakBefore="0" lineWrap="BREAK"/>
      <hh:margin>
        <hh:intent value="0" type="HWPUNIT"/>
        <hh:left value="0" type="HWPUNIT"/>
        <hh:right value="0" type="HWPUNIT"/>
        <hh:prev value="0" type="HWPUNIT"/>
        <hh:next value="0" type="HWPUNIT"/>
        <hh:lineSpacing value="160" type="PERCENT" unit="HWPUNIT"/>
      </hh:margin>
      <hh:border borderFillIDRef="1" offsetLeft="0" offsetRight="0" offsetTop="0" offsetBottom="0" connect="0" ignoreMargin="0"/>
    </hh:paraPr>
  </hh:paraProperties>
  <hh:styles itemCnt="1">
    <hh:style id="0" type="PARA" name="바탕글" engName="Normal" paraPrIDRef="0" charPrIDRef="0" nextStyleIDRef="0" langID="1042" lockForm="0"/>
  </hh:styles>
  <hh:memoProperties itemCnt="0"/>
  <hh:trackChanges itemCnt="0"/>
  <hh:trackChangeAuthors itemCnt="0"/>
  <hh:forbiddenWordList itemCnt="0"/>
  <hh:compatibleDocument targetProgram="HWP201X"/>
  <hh:docOption>
    <hh:linkinfo></hh:linkinfo>
  </hh:docOption>
</hh:head>`;
}

function paragraphXml(text: string, index: number, includeSecPr: boolean): string {
  const escaped = escapeXml(text || "");
  const secPr = includeSecPr
    ? `<hp:secPr id="" textDirection="HORIZONTAL" spaceColumns="1134" tabStop="8000" tabStopVal="4000" tabStopUnit="HWPUNIT" outlineShapeIDRef="0" memoShapeIDRef="0" textVerticalWidthHead="0" masterPageCnt="0">
        <hp:grid lineGrid="0" charGrid="0"/>
        <hp:startNum pageStartsOn="BOTH" page="0" pic="0" tbl="0" equation="0"/>
        <hp:visibility hideFirstHeader="0" hideFirstFooter="0" hideFirstMasterPage="0" border="SHOW_ALL" fill="SHOW_ALL" hideFirstPageNum="0" hideFirstEmptyLine="0" showJiPo="1"/>
        <hp:lineNumberShape restartType="0" countBy="0" distance="0" startNumber="0"/>
        <hp:pagePr landscape="WIDELY" width="59528" height="84188" gutterType="LEFT_ONLY">
          <hp:margin header="4252" footer="4252" gutter="0" left="8504" right="8504" top="5668" bottom="4252"/>
        </hp:pagePr>
        <hp:footNotePr>
          <hp:autoNumFormat type="DIGIT" userChar="*" prefixChar="" suffixChar=")" supscript="0"/>
          <hp:noteLine length="-1" type="SOLID" width="0.12 mm" color="#000000"/>
          <hp:noteSpacing betweenNotes="850" belowText="567" aboveText="850"/>
          <hp:numbering type="CONTINUOUS" newNum="1"/>
          <hp:placement place="EACH_COLUMN" beneathText="0"/>
        </hp:footNotePr>
        <hp:endNotePr>
          <hp:autoNumFormat type="DIGIT" userChar="*" prefixChar="" suffixChar=")" supscript="0"/>
          <hp:noteLine length="14692344" type="SOLID" width="0.12 mm" color="#000000"/>
          <hp:noteSpacing betweenNotes="0" belowText="0" aboveText="0"/>
          <hp:numbering type="CONTINUOUS" newNum="1"/>
          <hp:placement place="EACH_COLUMN" beneathText="0"/>
        </hp:endNotePr>
        <hp:pageBorderFill type="BOTH" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER">
          <hp:offset left="1417" right="1417" top="1417" bottom="1417"/>
        </hp:pageBorderFill>
        <hp:pageBorderFill type="EVEN" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER">
          <hp:offset left="1417" right="1417" top="1417" bottom="1417"/>
        </hp:pageBorderFill>
        <hp:pageBorderFill type="ODD" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER">
          <hp:offset left="1417" right="1417" top="1417" bottom="1417"/>
        </hp:pageBorderFill>
      </hp:secPr>`
    : "";
  return `  <hp:p id="${index}" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">
    <hp:run charPrIDRef="0">${secPr}
      <hp:t>${escaped}</hp:t>
    </hp:run>
    <hp:linesegarray>
      <hp:lineseg textpos="0" vertpos="0" vertsize="${1000}" textheight="${1000}" baseline="850" spacing="600" horzpos="0" horzsize="42520" flags="393216"/>
    </hp:linesegarray>
  </hp:p>`;
}

function sectionXml(text: string): string {
  const paragraphs = (text || "").split(/\r?\n/);
  if (paragraphs.length === 0) paragraphs.push("");
  const body = paragraphs
    .map((p, i) => paragraphXml(p, i, i === 0))
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<hs:sec xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section" xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph">
${body}
</hs:sec>`;
}

export async function buildHwpx(opts: HwpxBuilderOptions): Promise<Blob> {
  const zip = new JSZip();
  // mimetype must be uncompressed and first entry
  zip.file("mimetype", "application/hwp+zip", { compression: "STORE" });
  zip.file("version.xml", VERSION_XML);
  zip.folder("META-INF")!.file("container.xml", CONTAINER_XML);
  zip.folder("META-INF")!.file("manifest.xml", MANIFEST_XML);
  const contents = zip.folder("Contents")!;
  contents.file("content.hpf", CONTENT_HPF);
  contents.file("header.xml", headerXml(opts.fontName, Math.round(opts.fontSizePt * 100)));
  contents.file("section0.xml", sectionXml(opts.text));

  return zip.generateAsync({
    type: "blob",
    mimeType: "application/hwp+zip",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });
}
